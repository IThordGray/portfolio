import { ICoordinate } from '../../abstractions/coord';
import { round5 } from '../../abstractions/round-5.helper';
import { ABOUT } from '../../data/about';
import { MAIN_MAP_COLLISIONS } from '../../data/main-map.collisions';
import { MAIN_MAP_TRANSITIONS } from '../../data/main-map.transitions';
import { mapTransitions, state } from '../../global-constants';
import { BackgroundSprite } from '../sprites/background.sprite';
import { BoundarySprite } from '../sprites/boundary.sprite';
import { ForegroundSprite } from '../sprites/foreground.sprite';
import { NpcSprite } from '../sprites/npc.sprite';
import { OldManSprite } from '../sprites/old-man.sprite';
import { GameMap } from './game-map';

export class MainMap extends GameMap {
  static #bgSprite: BackgroundSprite;
  static #fgSprite: ForegroundSprite;
  static #boundarySprites: BoundarySprite[];

  constructor(args = { direction: 'down' }) {
    super(args);
  }

  override getBackground(): BackgroundSprite {
    MainMap.#bgSprite ??= new BackgroundSprite({
      src: 'assets/background.png',
      position: this.getSpawnCoords()
    });

    return MainMap.#bgSprite;
  }

  override getBoundaries(): BoundarySprite[] {
    MainMap.#boundarySprites ??= this.convertCollisionsToBoundaries({
      collisions: MAIN_MAP_COLLISIONS,
      transitions: MAIN_MAP_TRANSITIONS
    }, 70, transitionValue => mapTransitions[transitionValue], 4);

    return MainMap.#boundarySprites;
  }

  override getForeground(): ForegroundSprite {
    MainMap.#fgSprite ??= new ForegroundSprite({
      src: 'assets/foreground.png',
      position: this.getSpawnCoords()
    });

    return MainMap.#fgSprite;
  }

  override getNPCs(): NpcSprite[] {
    const position: ICoordinate = { x: this.getSpawnCoords().x - 695, y: this.getSpawnCoords().y };
    const path: ICoordinate[] = [
      { x: this.getSpawnCoords().x - 695, y: this.getSpawnCoords().y },
      { x: this.getSpawnCoords().x - 470, y: this.getSpawnCoords().y },
      { x: this.getSpawnCoords().x - 470, y: this.getSpawnCoords().y - 155 },
      { x: this.getSpawnCoords().x - 695, y: this.getSpawnCoords().y - 155 }
    ];

    const oldMan = new OldManSprite({
      position, direction: 'down',
      speed: this.moveSpeed / 2,
      path,
      onInteractAsync: async () => {
        const value = await state.openPromptAsync('Want me to tell you more about Ivor?');
        if (value) await state.openDialogAsync(ABOUT);
      }
    });

    return [ oldMan ];
  }

  getSpawnCoords(): ICoordinate {
    const x = round5((state.canvas.width / 2) - 1390);
    const y = round5((state.canvas.height / 2) - 770);
    return { x, y };
  }
}
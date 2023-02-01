import { ICoordinate } from '../../abstractions/coord';
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
  constructor(args = { spawnCoordinate: { x: -590, y: -340 }, direction: 'down' }) {
    super(args);
  }

  override getBackground(): BackgroundSprite {
    return new BackgroundSprite({
      src: 'assets/background.png',
      position: this.offset
    });
  }

  override getBoundaries(): BoundarySprite[] {
    return this.convertCollisionsToBoundaries({
      collisions: MAIN_MAP_COLLISIONS,
      transitions: MAIN_MAP_TRANSITIONS
    }, 70, transitionValue => mapTransitions[transitionValue], 4);
  }

  override getForeground(): ForegroundSprite {
    return new ForegroundSprite({
      src: 'assets/foreground.png',
      position: this.offset
    });
  }

  override getNPCs(): NpcSprite[] {
    const position: ICoordinate = { x: -1280, y: -340 };
    const path: ICoordinate[] = [
      { x: -1280, y: -340 },
      { x: -1060, y: -340 },
      { x: -1060, y: -440 },
      { x: -1280, y: -440 }
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
}
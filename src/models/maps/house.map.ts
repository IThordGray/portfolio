import { ICoordinate } from '../../abstractions/coord';
import { HOUSE_MAP_COLLISIONS } from '../../data/house1.collisions';
import { HOUSE_MAP_TRANSITIONS } from '../../data/house1.transitions';
import { mapTransitions } from '../../global-constants';
import { BackgroundSprite } from '../sprites/background.sprite';
import { BoundarySprite } from '../sprites/boundary.sprite';
import { ForegroundSprite } from '../sprites/foreground.sprite';
import { GameMap } from './game-map';

export class HouseMap extends GameMap {
  static #bgSprite: BackgroundSprite;
  static #fgSprite: ForegroundSprite;
  static #boundarySprites: BoundarySprite[];

  constructor(args = { direction: 'up' }) {
    super(args);
  }

  override getBackground(): BackgroundSprite {
    HouseMap.#bgSprite ??= new BackgroundSprite({
      src: 'assets/house_background.png',
      position: this.getSpawnCoords()
    });

    return HouseMap.#bgSprite;
  }

  override getBoundaries(): BoundarySprite[] {
    HouseMap.#boundarySprites ??= this.convertCollisionsToBoundaries({
      collisions: HOUSE_MAP_COLLISIONS,
      transitions: HOUSE_MAP_TRANSITIONS
    }, 64, transitionValue => mapTransitions[transitionValue]);

    return HouseMap.#boundarySprites;
  }

  override getForeground(): ForegroundSprite {
    HouseMap.#fgSprite ??= new ForegroundSprite({
      src: 'assets/house_foreground.png',
      position: this.getSpawnCoords()
    });

    return HouseMap.#fgSprite;
  }

  getSpawnCoords(): ICoordinate {
    const x = 420;
    const y = -95;
    return { x, y };
  }
}
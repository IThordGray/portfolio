import { HOUSE_MAP_COLLISIONS } from '../../data/house1.collisions';
import { HOUSE_MAP_TRANSITIONS } from '../../data/house1.transitions';
import { mapTransitions } from '../../global-constants';
import { BackgroundSprite } from '../sprites/background.sprite';
import { BoundarySprite } from '../sprites/boundary.sprite';
import { ForegroundSprite } from '../sprites/foreground.sprite';
import { GameMap } from './game-map';

export class HouseMap extends GameMap {
  constructor(args = { spawnCoordinate: { x: 415, y: -95 }, direction: 'up' }) {
    super(args);
  }

  override getBackground(): BackgroundSprite {
    return new BackgroundSprite({
      src: 'assets/house_background.png',
      position: this.offset
    });
  }

  override getBoundaries(): BoundarySprite[] {
    return this.convertCollisionsToBoundaries({
      collisions: HOUSE_MAP_COLLISIONS,
      transitions: HOUSE_MAP_TRANSITIONS
    }, 64, transitionValue => mapTransitions[transitionValue]);
  }

  override getForeground(): ForegroundSprite {
    return new ForegroundSprite({
      src: 'assets/house_foreground.png',
      position: this.offset
    });
  }
}
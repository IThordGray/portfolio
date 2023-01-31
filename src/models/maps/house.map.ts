import { HOUSE_MAP_COLLISIONS } from "../../data/house1.collisions";
import { HOUSE_MAP_TRANSITIONS } from "../../data/house1.transitions";
import { mapTransitions } from "../../global-constants";
import { BackgroundSprite } from "../sprites/background.sprite";
import { ForegroundSprite } from "../sprites/foreground.sprite";
import { GameMap } from "./game-map";

export class HouseMap extends GameMap {
  constructor(args = { spawnCoordinate: { x: 440, y: -40 }, direction: 'up' }) {
    super(args);
  }

  getBackground() {
    return new BackgroundSprite({
      src: 'assets/house_background.png',
      position: this.offset
    });
  }

  getBoundaries() {
    return this.convertCollisionsToBoundaries({
      collisions: HOUSE_MAP_COLLISIONS,
      transitions: HOUSE_MAP_TRANSITIONS
    }, 64, transitionValue => mapTransitions[transitionValue]);
  }

  getForeground() {
    return new ForegroundSprite({
      src: 'assets/house_foreground.png',
      position: this.offset
    });
  }
}
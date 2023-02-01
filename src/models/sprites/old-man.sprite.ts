import { Sprites } from '../../abstractions/sprites.type';
import { NpcSprite } from './npc.sprite';

export class OldManSprite extends NpcSprite {
  constructor(args) {
    super(args);
  }

  override getSprites(): Sprites {
    return {
      up: 'assets/oldManUp.png',
      right: 'assets/oldManRight.png',
      down: 'assets/oldManDown.png',
      left: 'assets/oldManLeft.png'
    };
  }
}
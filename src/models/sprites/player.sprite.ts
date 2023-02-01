import { Sprites } from '../../abstractions/sprites.type';
import { state } from '../../global-constants';
import { CharacterSprite } from './character.sprite';

export class PlayerSprite extends CharacterSprite {
  constructor(args) {
    super(args);

    this.position.x = state.canvas.width / 2 - this.width / 2;
    this.position.y = state.canvas.height / 2 - this.height / 2;
  }

  override getSprites(): Sprites {
    return {
      up: 'assets/playerUp.png',
      right: 'assets/playerRight.png',
      down: 'assets/playerDown.png',
      left: 'assets/playerLeft.png'
    };
  }
}
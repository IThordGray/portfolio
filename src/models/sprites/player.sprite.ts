import { Sprites } from '../../abstractions/sprites.type';
import { state } from '../../global-constants';
import { CharacterSprite, ICharacterSpriteOptions } from './character.sprite';

export type IPlayerSpriteOptions = ICharacterSpriteOptions;

export class PlayerSprite extends CharacterSprite {
  constructor(args: IPlayerSpriteOptions) {
    super(args);

    this.img.onload = () => {
      this.width = this.img.width / this.maxFrames;
      this.height = this.img.height;
      this.position.x = state.canvas.width / 2 - this.width / 2;
      this.position.y = state.canvas.height / 2 - this.height / 2;
      console.log(this.width, this.height);
    };
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
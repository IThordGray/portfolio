import { state } from '../../global-constants';
import { IImageSpriteOptions, ImageSprite } from './image.sprite';

export type IBackgroundSpriteOptions = IImageSpriteOptions;

export class BackgroundSprite extends ImageSprite {
  constructor(args: IBackgroundSpriteOptions) {
    super(args);
  }

  override draw(): void {
    state.ctx.fillStyle = 'black';
    state.ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);
    state.ctx.drawImage(this.img, this.position.x, this.position.y);
  }
}
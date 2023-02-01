import { state } from '../../global-constants';
import { IImageSpriteOptions, ImageSprite } from './image.sprite';

export type IForegroundSpriteOptions = IImageSpriteOptions;

export class ForegroundSprite extends ImageSprite {
  constructor(args: IForegroundSpriteOptions) {
    super(args);
  }

  override draw(): void {
    state.ctx.drawImage(this.img, this.position.x, this.position.y);
  }
}

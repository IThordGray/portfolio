import { ISpriteOptions, Sprite } from './sprite';

export interface IImageSpriteOptions extends ISpriteOptions {
  frames?: number;
  src?: string;
}

export abstract class ImageSprite extends Sprite {
  readonly #maxFrames: number;
  img = new Image();

  get maxFrames() {
    return this.#maxFrames;
  }

  set src(value) {
    this.img.src = value;
    this.width = this.img.width / this.#maxFrames;
    this.height = this.img.height;
  }

  protected constructor(args: IImageSpriteOptions) {
    super(args);

    this.#maxFrames = args?.frames ?? 1;
    if (args.src) this.src = args.src;
  }
}
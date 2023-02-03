import { Direction } from '../../abstractions/direction.type';
import { Sprites } from '../../abstractions/sprites.type';
import { SpriteAnimation } from '../../compositions/sprite-animation';
import { state } from '../../global-constants';
import { ImageSprite } from './image.sprite';
import { ISpriteOptions } from './sprite';

type SpriteImages = Record<Direction, HTMLImageElement>;

export interface ICharacterSpriteOptions extends ISpriteOptions {
  speed?: number;
  direction?: Direction;
}

export abstract class CharacterSprite extends ImageSprite {
  readonly #spriteImages: SpriteImages;
  readonly #speed: number;
  #direction: Direction;
  spriteAnimation: SpriteAnimation;

  get speed() {
    return this.#speed;
  }

  override get top() {
    return super.top + (this.height / 2);
  }

  protected constructor(args: ICharacterSpriteOptions) {
    super({ ...args, frames: 4 });

    this.#speed = args.speed;

    this.#spriteImages = {} as SpriteImages;
    for (const [ direction, src ] of Object.entries(this.getSprites())) {
      this.#spriteImages[direction] = new Image();
      this.#spriteImages[direction].src = src;
    }

    this.setSprite(args.direction ?? 'down');
  }

  override draw(): void {
    if (state.debug) {
      state.ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
      state.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    this.width = this.img.width / this.maxFrames;
    this.height = this.img.height;

    this.spriteAnimation ??= new SpriteAnimation(this.maxFrames);
    this.spriteAnimation.imgWidth = this.width;
    const { sx, sy } = this.spriteAnimation.getCropCoordinates();

    state.ctx.drawImage(
      this.img,
      sx,
      sy,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    this.spriteAnimation?.increaseTick();
  }

  abstract getSprites(): Sprites;

  setSprite(direction: Direction): void {
    if (this.#direction === direction) return;

    this.img = this.#spriteImages[direction];
    this.#direction = direction;
  }
}
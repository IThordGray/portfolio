import { Direction } from "../../abstractions/direction.type";
import { Sprites } from "../../abstractions/sprites.type";
import { SpriteAnimation } from "../../compositions/sprite-animation";
import { state } from "../../global-constants";
import { ImageSprite } from "./image.sprite";

type SpriteImages = Record<Direction, HTMLImageElement>;

export abstract class CharacterSprite extends ImageSprite {
  #spriteImages: SpriteImages;
  #sprites = this.getSprites();
  #speed: number;
  #direction: Direction;
  spriteAnimation;

  get speed() {
    return this.#speed;
  }

  get top() {
    return super.top + (this.height / 2);
  }

  protected constructor(args) {
    super({ ...args, frames: 4 });

    this.#speed = args.speed;
    // this.src = this.#sprites[this.#direction];

    this.#spriteImages = {} as SpriteImages;
    for (const [ direction, src ] of Object.entries(this.getSprites())) {
      this.#spriteImages[direction] = new Image();
      this.#spriteImages[direction].src = src;
    }

    this.setSprite(args.direction ?? "down");

  }

  draw() {
    if (state.debug) {
      state.ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
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

  setSprite(direction) {
    if (this.#direction === direction) return;

    this.img = this.#spriteImages[direction];
    this.#direction = direction;
    this.width = this.img.width / this.maxFrames;
    this.height = this.img.height;
  }
}
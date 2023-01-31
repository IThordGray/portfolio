import { SpriteAnimation } from "../../compositions/sprite-animation";
import { state } from "../../global-constants";
import { ImageSprite } from "./image.sprite";

export class CharacterSprite extends ImageSprite {
  #sprites = this.getSprites();
  #speed;
  #direction;
  spriteAnimation;

  get speed() {
    return this.#speed;
  }

  get top() {
    return super.top + (this.height / 2);
  }

  constructor(args) {
    super({ ...args, frames: 4 });

    this.#direction = args.direction ?? "down";
    this.#speed = args.speed;
    this.src = this.#sprites[this.#direction];
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

  getSprites() {
  }

  setSprite(direction) {
    if (this.#direction === direction) return;
    this.img.src = this.#sprites[direction];
    this.#direction = direction;
  }
}
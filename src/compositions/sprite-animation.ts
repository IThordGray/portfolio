export class SpriteAnimation {
  readonly #spriteFrames;
  #elapsedTicks = 0;
  #animate = false;
  #currentSpriteFrame = 0;
  #tickSkip = 10;
  imgWidth = 0;

  constructor(spriteFrames = 1) {
    this.#spriteFrames = spriteFrames;
  }

  getCropCoordinates(): { sx: number; sy: number } {
    const sx = this.#currentSpriteFrame * this.imgWidth;
    const sy = 0;
    return { sx, sy };
  }

  increaseTick(): void {
    if (!this.#animate) return;

    if (this.#spriteFrames > 1) this.#elapsedTicks++;

    if (this.#elapsedTicks % this.#tickSkip !== 0) return;
    this.#currentSpriteFrame = this.#currentSpriteFrame < this.#spriteFrames - 1
      ? this.#currentSpriteFrame + 1
      : 0;
  }

  start(): void {
    this.#animate = true;
  }

  stop(): void {
    this.#animate = false;
  }
}
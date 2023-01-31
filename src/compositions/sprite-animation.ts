export class SpriteAnimation {
    #spriteFrames;
    #elapsedTicks = 0;
    #animate = false;
    #currentSpriteFrame = 0;
    imgWidth = 0;
    #tickSkip = 10;

    constructor(spriteFrames = 1) {
        this.#spriteFrames = spriteFrames;
    }

    getCropCoordinates() {
        const sx = this.#currentSpriteFrame * this.imgWidth;
        const sy = 0;
        return { sx, sy };
    }

    increaseTick() {
        if (!this.#animate) return;

        if (this.#spriteFrames > 1) this.#elapsedTicks++;

        if (this.#elapsedTicks % this.#tickSkip !== 0) return;
        this.#currentSpriteFrame = this.#currentSpriteFrame < this.#spriteFrames - 1
            ? this.#currentSpriteFrame + 1
            : 0;
    }

    start() {
        this.#animate = true;
    }

    stop() {
        this.#animate = false;
    }
}
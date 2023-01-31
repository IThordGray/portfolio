import { state } from "../../global-constants";

export class Sprite {
  #position;
  height;
  width;

  padding = 24;

  get bottom() {
    return this.#position.y + this.height;
  }

  get ctx() {
    return state.ctx;
  }

  get left() {
    return this.#position.x;
  }

  get position() {
    return this.#position;
  }

  get right() {
    return this.#position.x + this.width;
  }

  get top() {
    return this.#position.y;
  }

  constructor({ position }: { position?: any }) {
    this.#position = { ...position ?? { x: 0, y: 0 } };
  }

  draw() {
  }
}
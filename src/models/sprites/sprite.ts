import { ICoordinate } from '../../abstractions/coord';
import { state } from '../../global-constants';

export interface ISpriteOptions {
  position?: ICoordinate;
}

export abstract class Sprite {
  readonly #position: ICoordinate;
  height: number;
  width: number;

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

  constructor(args?: ISpriteOptions) {
    this.#position = { ...args?.position ?? { x: 0, y: 0 } };
  }

  abstract draw();
}
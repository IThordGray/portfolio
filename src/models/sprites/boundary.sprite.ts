import { checkCollide, state } from "../../global-constants";
import { Sprite } from "./sprite";

const BOUNDARY_COLORS = {
  collision: 'rgba(255, 0, 0, 0.5)',
  transition: 'rgba(255, 0, 255, 0.5)'
};

export class BoundarySprite extends Sprite {
  #multiplier;
  #type;
  #meta;

  get type() {
    return this.#type;
  }

  get meta() {
    return this.#meta;
  }

  constructor(args) {
    super(args);

    this.#multiplier = args?.multiplier ?? 1;
    this.height = 12 * this.#multiplier;
    this.width = 12 * this.#multiplier;
    this.#type = args.type;
    this.#meta = args.meta;
  }

  draw() {
    if (state.debug) {
      state.ctx.fillStyle = this.#type;
      state.ctx.fillStyle = BOUNDARY_COLORS[this.#type];
      state.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }

  getCollide(sprite, { vOffset, hOffset }: { vOffset?: number, hOffset?: number } = {}) {
    vOffset ??= 0;
    hOffset ??= 0;

    return checkCollide(sprite, this, hOffset, -vOffset) ? this : null;
  }

}
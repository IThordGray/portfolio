import { checkCollide, state } from '../../global-constants';
import { ISpriteOptions, Sprite } from './sprite';

type BoundaryType = 'collision' | 'transition';

const BOUNDARY_COLORS = {
  collision: 'rgba(255, 0, 0, 0.5)',
  transition: 'rgba(255, 0, 255, 0.5)'
};

export interface IBoundarySpriteOptions extends ISpriteOptions {
  multiplier: number;
  type: BoundaryType;
  meta: any;
}

export class BoundarySprite extends Sprite {
  readonly #multiplier: number;
  readonly #type: BoundaryType;
  readonly #meta: any;

  get meta() {
    return this.#meta;
  }

  get type() {
    return this.#type;
  }

  constructor(args: IBoundarySpriteOptions) {
    super(args);

    this.#multiplier = args?.multiplier ?? 1;
    this.height = 12 * this.#multiplier;
    this.width = 12 * this.#multiplier;
    this.#type = args.type;
    this.#meta = args.meta;
  }

  override draw(): void {
    if (state.debug) {
      state.ctx.fillStyle = this.#type;
      state.ctx.fillStyle = BOUNDARY_COLORS[this.#type];
      state.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }

  getCollide(sprite, { vOffset, hOffset }: { vOffset?: number, hOffset?: number } = {}): this {
    vOffset ??= 0;
    hOffset ??= 0;

    return checkCollide(sprite, this, hOffset, -vOffset) ? this : null;
  }

}
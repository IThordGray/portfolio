import { state } from "../../global-constants";
import { ImageSprite } from "./image.sprite";

export class ForegroundSprite extends ImageSprite {
  constructor(args) {
    super(args);
  }

  draw() {
    state.ctx.drawImage(this.img, this.position.x, this.position.y);
  }
}

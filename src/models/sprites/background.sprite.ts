import { state } from "../../global-constants";
import { ImageSprite } from "./image.sprite";

export class BackgroundSprite extends ImageSprite {
  constructor(args) {
    super(args);
  }

  draw() {
    state.ctx.fillStyle = "black";
    state.ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);
    state.ctx.drawImage(this.img, this.position.x, this.position.y);
  }
}
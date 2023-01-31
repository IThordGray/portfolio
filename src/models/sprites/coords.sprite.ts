import { state } from "../../global-constants";
import { Sprite } from "./sprite";

export class CoordsSprite extends Sprite {
    width = 300;
    height = 110;

    constructor() {
        super({ position: { x: 20, y: 20 } });
    }

    draw() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.left, this.top, this.width, this.height);
        this.ctx.fillStyle = 'black';
        this.ctx.lineWidth = 2;

        this.ctx.strokeRect(this.left, this.top, this.width, this.height);
        this.ctx.strokeRect(this.left, this.top, this.width, this.height + 2);
        this.ctx.strokeRect(this.left + 8, this.top + 8, this.width - 16, this.height - 16);
        this.ctx.strokeRect(this.left + 8, this.top + 10, this.width - 16, this.height - 18);

        this.ctx.font = '20px press-start';
        this.ctx.fillText('Coordinates', this.left + this.padding, this.top + 20 + this.padding);
        this.ctx.font = '16px press-start';
        this.ctx.fillText('x: ' + state.currentMap?.position?.x, this.left + 24, this.top + 40 + 24);
        this.ctx.fillText('y: ' + state.currentMap?.position?.y, this.left + 24, this.top + 40 + 24 + 24);
    }
}
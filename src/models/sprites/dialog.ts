import { state } from "../../global-constants";
import { Sprite } from "./sprite";

export class Dialog extends Sprite {
  #requestAnimationFrame: number;
  container: HTMLElement;
  onClose;

  numberOfColumns: number;
  numberOfRows: number;

  dialogColumns: number;
  dialogRows: number;

  get canvas() {
    return state.canvas;
  }

  get columnWidth() {
    return this.canvas.width / this.numberOfColumns;
  }

  get dialogHeight() {
    return this.rowHeight * this.dialogRows;
  }

  get dialogLeft() {
    return (this.canvas.width - this.dialogWidth) / 2;
  }

  get dialogTop() {
    return (this.canvas.height - this.dialogHeight) / 2;
  }

  get dialogWidth() {
    return this.columnWidth * this.dialogColumns;
  }

  get rowHeight() {
    return this.canvas.height / this.numberOfRows;
  }

  close(args?) {
    if (!this.#requestAnimationFrame) return;
    window.cancelAnimationFrame(this.#requestAnimationFrame);

    this.destroyContent();

    this.container?.remove();
    if (state.currentMap) state.currentMap.paused = false;
    this.onClose(args);
  }

  destroyContent() {
    throw new Error("Method not implemented");
  }

  draw() {
    this.#requestAnimationFrame = window.requestAnimationFrame(this.draw.bind(this));

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.dialogLeft, this.dialogTop, this.dialogWidth, this.dialogHeight);
    this.ctx.fillStyle = "black";
    this.ctx.lineWidth = 2;

    this.ctx.strokeRect(this.dialogLeft, this.dialogTop, this.dialogWidth, this.dialogHeight);
    this.ctx.strokeRect(this.dialogLeft, this.dialogTop, this.dialogWidth, this.dialogHeight + 2);
    this.ctx.strokeRect(this.dialogLeft + 8, this.dialogTop + 8, this.dialogWidth - 16, this.dialogHeight - 16);
    this.ctx.strokeRect(this.dialogLeft + 8, this.dialogTop + 10, this.dialogWidth - 16, this.dialogHeight - 18);
  }

  open(args) {
    this.setupContentContainer();
    this.setupContent(args);

    if (state.currentMap) state.currentMap.paused = true;
    this.draw();
    return this;
  }

  setupContent(args) {
    throw new Error("Method not implemented");
  };

  setupContentContainer() {
    if (this.container) return;
    const div = document.createElement("div");
    div.style.position = "absolute";

    div.style.display = `flex`;
    div.style.flexDirection = `column`;

    div.style.left = `${ this.dialogLeft + 8 + (this.padding / 2) }px`;
    div.style.top = `${ this.dialogTop + 10 + (this.padding / 2) }px`;
    div.style.width = `${ this.dialogWidth - this.padding }px`;
    div.style.height = `${ this.dialogHeight - this.padding - 1 }px`;
    div.style.fontSize = "24px";

    document.querySelector("body")?.appendChild(div);
    this.container = div;
  }
}
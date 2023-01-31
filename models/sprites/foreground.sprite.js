class ForegroundSprite extends ImageSprite {
  constructor(args) {
    super(args);
  }

  draw() {
    state.ctx.drawImage(this.img, this.position.x, this.position.y);
  }
}

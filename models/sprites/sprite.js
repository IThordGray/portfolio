class Sprite {
    #position;
    height;
    width;

    padding = 24;
    
    get bottom() { return this.#position.y + this.height; }
    get left() { return this.#position.x; }
    get position() { return this.#position; }
    get right() { return this.#position.x + this.width }
    get top() { return this.#position.y; }

    get ctx() { return state.ctx; }

    constructor({ position }) {
        this.#position = { ...position ?? { x: 0, y: 0 } };
    }

    draw() { }
}
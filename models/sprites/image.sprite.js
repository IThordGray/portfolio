class ImageSprite extends Sprite {
    #maxFrames = 1;
    #img = new Image();

    get img() { return this.#img; }
    get maxFrames() { return this.#maxFrames; }

    set src(value) {
        this.#img.src = value;
        this.width = this.#img.width / this.#maxFrames;
        this.height = this.#img.height;
    }

    constructor(args) {
        super(args);

        if (args.frames) this.#maxFrames = args.frames;
        if (args.src) this.src = args.src;
    }
}
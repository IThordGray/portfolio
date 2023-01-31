export class InputController {

  #keyMap = {};

  horizontal = 0;
  vertical = 0;

  constructor() {

    this.#mapKey("ArrowUp",
      () => this.vertical = 1,
      () => this.vertical = this.vertical === -1 ? -1 : 0
    );

    this.#mapKey("KeyW",
      () => this.vertical = 1,
      () => this.vertical = this.vertical === -1 ? -1 : 0
    );

    this.#mapKey("ArrowRight",
      () => this.horizontal = 1,
      () => this.horizontal = this.horizontal === -1 ? -1 : 0
    );

    this.#mapKey("KeyD",
      () => this.horizontal = 1,
      () => this.horizontal = this.horizontal === -1 ? -1 : 0
    );

    this.#mapKey("ArrowDown",
      () => this.vertical = -1,
      () => this.vertical = this.vertical === 1 ? 1 : 0
    );

    this.#mapKey("KeyS",
      () => this.vertical = -1,
      () => this.vertical = this.vertical === 1 ? 1 : 0
    );

    this.#mapKey("ArrowLeft",
      () => this.horizontal = -1,
      () => this.horizontal = this.horizontal === 1 ? 1 : 0
    );

    this.#mapKey("KeyA",
      () => this.horizontal = -1,
      () => this.horizontal = this.horizontal === 1 ? 1 : 0
    );

    window.addEventListener("keydown", e => {
      this.#keyMap[e.code]?.keydown?.();
    });

    window.addEventListener("keyup", e => {
      this.#keyMap[e.code]?.keyup?.();
    });

  }

  #mapKey(keyCode, keydown, keyup) {
    this.#keyMap[keyCode] ??= { keydown, keyup };
  }

}
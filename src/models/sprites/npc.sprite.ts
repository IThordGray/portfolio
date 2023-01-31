import { CharacterSprite } from "./character.sprite";

export class NpcSprite extends CharacterSprite {
  #path;
  #onInteractAsync;
  #interacting = false;

  get interacting() {
    return this.#interacting;
  }

  get onInteractAsync() {
    return this.#onInteractAsync;
  }

  get path() {
    return this.#path;
  }

  constructor(args) {
    super(args);

    this.#path = args.path;
    this.#onInteractAsync = async () => {
      this.#interacting = true;
      await args.onInteractAsync?.();
      setTimeout(() => {
        this.#interacting = false;
      }, 5000);
    };
  }
}
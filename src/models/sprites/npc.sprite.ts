import { ICoordinate } from '../../abstractions/coord';
import { CharacterSprite } from './character.sprite';

export abstract class NpcSprite extends CharacterSprite {
  readonly #path: ICoordinate[];
  readonly #onInteractAsync: () => Promise<void>;
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

  protected constructor(args) {
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
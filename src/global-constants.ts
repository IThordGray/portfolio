import { InputController } from "./input.controller";
import { State } from "./state";

export const state = new State();
export const inputController = new InputController();

export function checkCollide(a, b, hOffset, vOffset) {
  return (
    a.left + hOffset <= b.right &&
    a.right + hOffset >= b.left &&
    a.top + vOffset <= b.bottom &&
    a.bottom + vOffset >= b.top
  );
}

export const mapTransitions = {};

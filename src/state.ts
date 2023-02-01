import { GameMap } from './models/maps/game-map';
import { ConfirmDialog } from './models/sprites/confirm.dialog';
import { DisplayDialog } from './models/sprites/display.dialog';

export class State {
  #currentMap: GameMap;
  #openedDialog: DisplayDialog;
  #openedConfirmation: ConfirmDialog;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  showCoords = true;
  debug = this.#getDebugConfig();

  get currentMap() {
    return this.#currentMap;
  }

  set currentMap(value) {
    this.#currentMap?.destroy();
    this.#currentMap = value;
    this.#currentMap.animate();
    this.#currentMap.paused = false;
  }

  #getDebugConfig(): boolean {
    const qs = location.search;
    const params = new URLSearchParams(qs);
    const debug = params.get('debug');
    return debug?.trim()?.toLowerCase() === 'true';
  }

  closeAllDialogs(): void {
    this.#openedDialog?.close();
    this.#openedConfirmation?.close();
  }

  openDialogAsync(content: HTMLElement): Promise<unknown> {
    return new Promise(res => {
      if (this.#openedDialog) this.#openedDialog.close();
      if (this.#openedConfirmation) this.#openedConfirmation.close(false);

      this.showCoords = false;
      this.#openedDialog = new DisplayDialog();
      const dialogRef = this.#openedDialog.open(content);
      dialogRef.onClose = (args) => {
        this.showCoords = true;
        res(args);
      };
    });
  }

  openPromptAsync(msg: string): Promise<unknown> {
    return new Promise(res => {
      if (this.#openedDialog) this.#openedDialog.close();
      if (this.#openedConfirmation) this.#openedConfirmation.close(false);

      this.#openedConfirmation = new ConfirmDialog();
      const dialogRef = this.#openedConfirmation.open(msg);
      dialogRef.onClose = (args) => res(args);
    });
  }
}
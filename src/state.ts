import { HouseMap } from "./models/maps/house.map";
import { MainMap } from "./models/maps/main.map";
import { ConfirmDialog } from "./models/sprites/confirm.dialog";
import { DisplayDialog } from "./models/sprites/display.dialog";

export const MAPS = {
    'main': MainMap,
    'house': HouseMap
};

export class State {
    #currentMap;
    #openedDialog;
    #openedConfirmation;

    canvas;
    ctx;
    
    showCoords = true;
    debug = true;

    get currentMap() {
        return this.#currentMap;
    }

    set currentMap(value) {
        this.#currentMap?.destroy();
        this.#currentMap = value;
        this.#currentMap.animate();
        this.#currentMap.paused = false;
    }

    closeAllDialogs() {
        this.#openedDialog?.close()
        this.#openedConfirmation?.close();
    }

    openDialogAsync(content) {
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

    openPromptAsync(msg) {
        return new Promise(res => {
            if (this.#openedDialog) this.#openedDialog.close();
            if (this.#openedConfirmation) this.#openedConfirmation.close(false);

            this.#openedConfirmation = new ConfirmDialog();
            const dialogRef = this.#openedConfirmation.open(msg);
            dialogRef.onClose = (args) => res(args);
        });
    }
}
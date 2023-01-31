const MAPS = {
    'main': MainMap,
    'house': HouseMap
};
class State {
    #currentMap;
    #openedDialog;
    #openedConfirmation;

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
import { Dialog } from "./dialog";

export class DisplayDialog extends Dialog {

  #closeBtn;
  #onClose = () => this.close();

  numberOfRows = 8;
  dialogColumns = 6;
  dialogRows = 6;
  numberOfColumns = 8;

  constructor() {
    super({});

    // fromEvent<KeyboardEvent>(window, 'keyup').pipe(
    //   first()
    // ).subscribe(k => {
    //   if (k.code !== 'Escape') return;
    //   this.close();
    // });
  }

  destroyContent() {
    this.#closeBtn?.removeEventListener("click", this.#onClose);
    this.#closeBtn = undefined;
  }

  setUpButton() {
    if (this.#closeBtn) return;
    const btn = document.createElement("button");
    btn.style.position = "absolute";
    btn.style.top = `${ this.padding / 4 }px`;
    btn.style.right = `${ this.padding / 4 }px`;

    btn.style.background = "none";
    btn.style.border = "none";
    btn.style.fontFamily = "press-start";
    btn.style.fontSize = "48px";
    btn.style.cursor = "pointer";
    btn.innerText = "x";
    btn.addEventListener("click", () => this.#onClose());

    this.container?.appendChild(btn);
    this.#closeBtn = btn;
  }

  setupContent(content) {
    this.setUpButton();
    this.setupDialogContent(content);
  }

  setupDialogContent(content) {
    if (!content) return;
    this.container?.appendChild(content);
  }

}
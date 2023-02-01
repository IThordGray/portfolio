import { Dialog } from './dialog';

export class DisplayDialog extends Dialog {

  #closeBtn: HTMLButtonElement;
  #onClose = () => this.close();

  numberOfRows = 8;
  dialogColumns = 6;
  dialogRows = 6;
  numberOfColumns = 8;

  constructor() {
    super();
  }

  override destroyContent(): void {
    this.#closeBtn?.removeEventListener('click', this.#onClose);
    this.#closeBtn = undefined;
  }

  setUpButton(): void {
    if (this.#closeBtn) return;
    const btn = document.createElement('button');
    btn.style.position = 'absolute';
    btn.style.top = `${ this.padding / 4 }px`;
    btn.style.right = `${ this.padding / 4 }px`;

    btn.style.background = 'none';
    btn.style.border = 'none';
    btn.style.fontFamily = 'press-start';
    btn.style.fontSize = '48px';
    btn.style.cursor = 'pointer';
    btn.innerText = 'x';
    btn.addEventListener('click', () => this.#onClose());

    this.container?.appendChild(btn);
    this.#closeBtn = btn;
  }

  override setupContent(content: HTMLElement): void {
    this.setUpButton();
    this.setupDialogContent(content);
  }

  setupDialogContent(content: HTMLElement): void {
    if (!content) return;
    this.container?.appendChild(content);
  }

}
import { Dialog } from './dialog';

export class ConfirmDialog extends Dialog {
  #rejectBtn: HTMLButtonElement;
  #resolveBtn: HTMLButtonElement;
  #onReject = () => this.close(false);
  #onResolve = () => this.close(true);

  numberOfColumns = 16;
  dialogColumns = 5;
  dialogRows = 4;
  numberOfRows = 16;

  constructor() {
    super({});
  }

  override destroyContent(): void {
    this.#rejectBtn?.removeEventListener('click', this.#onReject);
    this.#resolveBtn?.removeEventListener('click', this.#onResolve);

    this.container?.remove();
    this.#rejectBtn = undefined;
    this.#resolveBtn = undefined;
  }

  getButton(txt): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.style.background = 'none';
    btn.style.border = 'none';
    btn.style.background = 'none';
    btn.style.border = 'none';
    btn.style.fontFamily = 'press-start';
    btn.style.fontSize = '24px';
    btn.style.cursor = 'pointer';
    btn.innerText = txt;

    return btn;
  }

  setUpButtons(): void {
    const actions = document.createElement('div');

    actions.style.display = 'flex';
    actions.style.justifyContent = 'space-around';
    actions.style.height = '3rem';
    actions.style.marginBottom = '1rem';
    actions.className = 'actions';

    if (!document.head.querySelector('#actions')) {
      const css = '.actions button:hover:before{ content: \'\\25B6\'; margin-right: 1rem }';
      const style = document.createElement('style');
      style.id = 'actions';
      style.innerText = css;
      document.head.appendChild(style);
    }

    const reject = this.getButton('No, thanks');
    const resolve = this.getButton('Sure!');

    reject.addEventListener('click', () => this.#onReject());
    resolve.addEventListener('click', () => this.#onResolve());

    actions?.appendChild(reject);
    actions?.appendChild(resolve);
    this.container?.appendChild(actions);
  }

  setUpContent(msg: string): void {
    const div = document.createElement('div');
    div.innerText = msg;
    // div.style.padding = '1rem';
    div.style.lineHeight = '2.5rem';
    div.style.textAlign = 'center';
    div.style.flexGrow = '1';

    this.container?.appendChild(div);
  }

  override setupContent(msg): void {
    this.setUpContent(msg);
    this.setUpButtons();
  }


}
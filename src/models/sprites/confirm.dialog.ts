import { Dialog } from "./dialog";

export class ConfirmDialog extends Dialog {
    #rejectBtn;
    #resolveBtn;
    #onReject = () => this.close(false);
    #onResolve = () => this.close(true);

    numberOfColumns = 16;
    dialogColumns = 5;
    dialogRows = 4;
    numberOfRows = 16;

    constructor() {
        super({});

        // fromEvent < KeyboardEvent > (window, 'keyup').pipe(
        //     first()
        // ).subscribe(k => {
        //     if (k.code !== 'Escape') return;
        //     this.close(false);
        // });
    }

    getButton(txt) {
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

    setUpContent(msg) {
        const div = document.createElement('div');
        div.innerText = msg;
        // div.style.padding = '1rem';
        div.style.lineHeight = '2.5rem';
        div.style.textAlign = 'center';
        div.style.flexGrow = '1';

        this.container?.appendChild(div);
    }

    destroyContent() {
        this.#rejectBtn?.removeEventListener('click', this.#onReject);
        this.#resolveBtn?.removeEventListener('click', this.#onResolve);

        this.container?.remove();
        this.#rejectBtn = undefined;
        this.#resolveBtn = undefined;
    }

    setUpButtons() {
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

    setupContent(msg) {
        this.setUpContent(msg);
        this.setUpButtons();
    }


}
const HEIGHT = 850;
const WIDTH = 1600;
const state = new State();
const inputController = new InputController();

const mapTransitions = {};

function checkCollide(a, b, hOffset, vOffset) {
    return (
        a.left + hOffset <= b.right &&
        a.right + hOffset >= b.left &&
        a.top + vOffset <= b.bottom &&
        a.bottom + vOffset >= b.top
    )
}

function main() {
    mapTransitions[1] = MainMap;
    mapTransitions[2] = HouseMap;

    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.height = HEIGHT;
    canvas.width = WIDTH;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    state.canvas = canvas;
    state.ctx = ctx;

    new MainMap();

    document.querySelectorAll('.menu-item').forEach(x => {
        x.addEventListener('click', (e) => {
            const item = e.target.attributes.getNamedItem('item');
            if (item.value === 'about') state.openDialogAsync(ABOUT);
            if (item.value === 'skills') state.openDialogAsync(SKILLS);
            if (item.value === 'contact') state.openDialogAsync(CONTACT);

            if (item.value === 'linkedin') window.open('https://www.linkedin.com/in/ivor-thord-gray/', '_blank');
            if (item.value === 'git') window.open('https://github.com/IThordGray', '_blank');
        });
    });
}

main();
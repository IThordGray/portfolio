import { ABOUT } from './data/about';
import { CONTACT } from './data/contact';
import { SKILLS } from './data/skills';
import { mapTransitions, state } from './global-constants';
import { HouseMap } from './models/maps/house.map';
import { MainMap } from './models/maps/main.map';

const HEIGHT = 850;
const WIDTH = 1600;


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
    x.addEventListener('click', (e: any) => {
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
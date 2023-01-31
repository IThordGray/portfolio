const SKILLS = document.createElement('div');
SKILLS.style.display = 'flex';
SKILLS.style.flexDirection = 'column';
SKILLS.style.padding = '2rem';

const skills_p1 = document.createElement('p');
skills_p1.innerText = `Hey there, I'm not just your average developer, I'm a problem-solving pro! I have a knack for designing and implementing effective solutions for all kinds of business requirements, and I make it look easy. And don't even get me started on my tech skills; I know Angular, Typescript, NestJS, Mongo and more like the back of my hand. In other words, I am confident that I would be an asset to any team!`;

const skills_imgContainer = document.createElement('div');
skills_imgContainer.style.display = 'flex';
skills_imgContainer.style.justifyContent = 'center';
skills_imgContainer.style.marginTop = '3rem';
skills_imgContainer.style.gap = '4rem';

for (let i = 1; i < 10; i++) {
  const img = document.createElement('img');
  img.style.width = '48px';
  img.src = `assets/skills/skill-0${ i }.svg`;
  skills_imgContainer.appendChild(img);
}

const skills_container = document.createElement('div');
skills_container.style.fontSize = '1rem';
skills_container.style.lineHeight = '2rem';
skills_container.style.padding = '2rem';

skills_container.appendChild(skills_p1);
skills_container.appendChild(skills_imgContainer)

const skills_content = document.createElement('div');
skills_content.style.display = 'flex';
skills_content.style.flexGrow = '1';
skills_content.style.alignItems = 'center';
// imgContainer.appendChild(img);

skills_content.appendChild(skills_container);

SKILLS.append(skills_content);

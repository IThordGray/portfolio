export const ABOUT = document.createElement("div");
ABOUT.style.display = "flex";
ABOUT.style.flexDirection = "column";
// about.style.alignItems = 'center';

const about_img = document.createElement("img");
about_img.src = "assets/about.jpeg";
about_img.alt = "Profile picture";
about_img.style.height = "400px";


const about_p1 = document.createElement("p");
about_p1.innerText = `Hey there! My name is Ivor and I've been on a wild ride as a developer for about 8 years now. It all started at a small startup where my love for coding took off like a rocket. As the company grew, so did my skills, and I've had the opportunity to work on a variety of projects and learn from some amazing people.`;

const about_p2 = document.createElement("p");
about_p2.innerText = `Fun fact: I may not have a traditional computer science degree, but my background in Psychology gives me a unique perspective when it comes to problem-solving and understanding user needs.`;

const about_p3 = document.createElement("p");
about_p3.innerText = `When I'm not typing away at my keyboard, you can find me hanging out with my family, getting my hands dirty with hydroponics or other DIY projects, or maybe even gaming on my free time.`;


const about_container = document.createElement("div");
about_container.style.fontSize = "1rem";
about_container.style.lineHeight = "2rem";
about_container.style.padding = "2rem";

about_container.appendChild(about_p1);
about_container.appendChild(about_p2);
about_container.appendChild(about_p3);

const about_content = document.createElement("div");
about_content.style.display = "flex";
about_content.style.flexGrow = "1";
about_content.style.alignItems = "center";

about_content.appendChild(about_img);
about_content.appendChild(about_container);

ABOUT.append(about_content);

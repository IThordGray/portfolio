import { state } from '../global-constants';

export const CONTACT = document.createElement('div');
CONTACT.style.display = 'flex';
CONTACT.style.flexDirection = 'column';
CONTACT.style.height = '100%';

const contactFormContainer = document.querySelector('.contact-form-container');

document.getElementById('contact-form').addEventListener('reset', function (event) {
  event.preventDefault();
  state.closeAllDialogs();
});

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/submit');

  const data = { };
  formData.forEach((v, k) => {
    data[k] = v;
  });

  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(data));
});

CONTACT.appendChild(contactFormContainer);
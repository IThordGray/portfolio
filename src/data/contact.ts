import { state } from "../global-constants";

export const CONTACT = document.createElement("div");
CONTACT.style.display = "flex";
CONTACT.style.flexDirection = "column";
CONTACT.style.height = "100%";

const contactForm = document.querySelector(".contact-form-container");

document.getElementById("contact-form").addEventListener("reset", function(event) {
  event.preventDefault();
  state.closeAllDialogs();
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();
  alert("Form submitted!");
});

CONTACT.appendChild(contactForm);
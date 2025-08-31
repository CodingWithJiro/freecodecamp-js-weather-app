//* IMPORT MODULES
import { fadeOutfadeInBackground } from "./ui.js";

//* THEME.JS SCRIPT
const iconLight = document.querySelector(".theme__icon--light");
const iconDark = document.querySelector(".theme__icon--dark");
const button = document.querySelector(".theme__button");
const html = document.documentElement;
const earth = document.querySelector(".main__background-image--earth");
const particles = document.querySelector(".main__background-image--particles");
const loading = document.querySelector(".weather__loading");

function showIconLight() {
  iconLight.classList.remove("hidden");
}

function hideIconLight() {
  iconLight.classList.add("hidden");
}

function showIconDark() {
  iconDark.classList.remove("hidden");
}

function hideIconDark() {
  iconDark.classList.add("hidden");
}

function addActiveTheme() {
  button.classList.add("active");
}

function removeActiveTheme() {
  button.classList.remove("active");
}

function addDarkTheme() {
  html.classList.add("dark");
}

function toggleDarkTheme() {
  html.classList.toggle("dark");
}

function savedTheme() {
  return localStorage.getItem("theme");
}

function prefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function updateAriaPressedToTrue() {
  button.setAttribute("aria-pressed", "true");
}

function updateAriaPressedToFalse() {
  button.setAttribute("aria-pressed", "false");
}

function updateAriaLabelForDark() {
  button.setAttribute("aria-label", "Switch to light theme");
}

function updateAriaLabelForLight() {
  button.setAttribute("aria-label", "Switch to dark theme");
}

function setBackgroundImagesToLight() {
  earth.setAttribute("src", "./assets/img/earth_360x286.svg");
  particles.setAttribute("src", "./assets/img/particles_350x373.svg");
  loading.setAttribute("src", "./assets/img/connecting_188x188.svg");
}

function setBackgroundImagesToDark() {
  earth.setAttribute("src", "./assets/img/earth-dark_360x286.svg");
  particles.setAttribute("src", "./assets/img/particles-dark_350x373.svg");
  loading.setAttribute("src", "./assets/img/connecting-dark_188x188.svg");
}

preLoadDarkTheme();
function preLoadDarkTheme() {
  if (savedTheme() === "dark" || (savedTheme() === null && prefersDark())) {
    addDarkTheme();
    addActiveTheme();
    hideIconLight();
    showIconDark();
    updateAriaPressedToTrue();
    updateAriaLabelForDark();
    setBackgroundImagesToDark();
    fadeOutfadeInBackground();
  }
}

export function isDarkTheme() {
  return html.classList.contains("dark");
}

function savePreferredTheme() {
  localStorage.setItem("theme", isDarkTheme() ? "dark" : "light");
}

export function initThemeToggle() {
  toggleTheme();
  function toggleTheme() {
    button.addEventListener("click", () => {
      toggleDarkTheme();

      if (isDarkTheme()) {
        addActiveTheme();
        hideIconLight();
        showIconDark();
        updateAriaPressedToTrue();
        updateAriaLabelForDark();
        setBackgroundImagesToDark();
        fadeOutfadeInBackground();
      } else {
        removeActiveTheme();
        showIconLight();
        hideIconDark();
        updateAriaPressedToFalse();
        updateAriaLabelForLight();
        setBackgroundImagesToLight();
        fadeOutfadeInBackground();
      }

      savePreferredTheme();
    });
  }
}

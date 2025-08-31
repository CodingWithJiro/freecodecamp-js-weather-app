//* UI.JS SCRIPT
const getWeatherButton = document.getElementById("get-weather-btn");
const weatherSelect = document.getElementById("city");
const surprise = document.querySelector(".header__surprise");
const surpriseAudio = document.getElementById("surprise-audio");
const particles = document.querySelector(".main__background-image--particles");
const earth = document.querySelector(".main__background-image--earth");

export function addFadeIn(element) {
  element.classList.add("fade-in");
  setTimeout(() => {
    element.classList.remove("fade-in");
    void element.offsetWidth;
  }, 300);
}

export function disableGetWeatherButton() {
  getWeatherButton.disabled = true;
}

export function enableGetWeatherButton() {
  getWeatherButton.disabled = false;
}

export function disableSelect() {
  weatherSelect.disabled = true;
}

export function enableSelect() {
  weatherSelect.disabled = false;
}

function handleClickSurprise() {
  if (surpriseAudio.paused) {
    surpriseAudio.play();
  } else {
    surpriseAudio.pause();
  }
}

export function initSurprise() {
  surprise.addEventListener("click", handleClickSurprise);
}

export function fadeOutfadeInBackground() {
  particles.classList.add("fade-out-fade-in");
  setTimeout(() => {
    particles.classList.remove("fade-out-fade-in");
    void particles.offsetWidth;
  }, 600);
  earth.classList.add("fade-out-fade-in");
  setTimeout(() => {
    earth.classList.remove("fade-out-fade-in");
    void earth.offsetWidth;
  }, 600);
}

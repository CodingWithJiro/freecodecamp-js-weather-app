//* IMPORT MODULES
import { getWeather } from "./api.js";
import { isDarkTheme } from "./theme.js";
import {
  addFadeIn,
  disableGetWeatherButton,
  enableGetWeatherButton,
  disableSelect,
  enableSelect,
  initSurprise,
} from "./ui.js";

//* WEATHER.JS SCRIPT
const getWeatherButton = document.getElementById("get-weather-btn");
const city = document.getElementById("city");
const weatherContainer = document.getElementById("weather-container");

async function showWeather(city) {
  try {
    const data = await getWeather(city);
    const icon = data.weather[0].icon ?? "N/A";
    const mainTemperature =
      data.main.temp !== undefined ? data.main.temp + " °C" : "N/A";
    const minTemperature =
      data.main.temp_min !== undefined ? data.main.temp_min + " °C" : "N/A";
    const maxTemperature =
      data.main.temp_max !== undefined ? data.main.temp_max + " °C" : "N/A";
    const feelsLike =
      data.main.feels_like !== undefined ? data.main.feels_like + " °C" : "N/A";
    const humidity =
      data.main.humidity !== undefined ? data.main.humidity + "%" : "N/A";
    const windSpeed =
      data.wind.speed !== undefined ? data.wind.speed + " m/s" : "N/A";
    const windGust =
      data.wind.gust !== undefined ? data.wind.gust + " m/s" : "N/A";
    const weather = data.weather[0].main ?? "N/A";
    const location = data.name ?? "N/A";
    const weatherDescription = data.weather[0].description ?? "N/A";

    weatherContainer.innerHTML = `
                  <header class="weather__header">
                <div class="weather__location-wrapper">
                  <svg
                    class="weather__location-icon"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>

                  <h2 class="weather__location" id="location">${location}</h2>
                </div>

                <div class="weather__overview">
                  <span class="weather__main-temperature" id="main-temperature"
                    >${mainTemperature}</span
                  >

                  <div class="weather__general">
                    <span class="weather__description" id="weather-main"
                      >${weather}</span
                    >

                    <img
                      class="weather__icon"
                      src="${icon}"
                      alt="The weather is ${weatherDescription}."
                      id="weather-icon"
                      width="50"
                      height="50"
                    />
                  </div>
                </div>
              </header>

              <section class="weather__range">
                <h2 class="weather__feels-like" id="feels-like">
                  Feels like: ${feelsLike}
                </h2>

                <div class="weather__range-wrapper">
                  <span class="weather__range-temperature" id="min-temperature"
                    >Min: ${minTemperature}</span
                  >
                  <span class="weather__range-temperature" id="max-temperature"
                    >Max: ${maxTemperature}</span
                  >
                </div>
              </section>

              <section class="weather__others">
                <h2 class="weather__others-title sr-only">
                  Weather Additional Information
                </h2>

                <div class="weather__others-wrapper">
                  <svg
                    class="weather__others-icon weather__others-icon--humidity"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Humidity</title>
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M15.0066 3.25608C16.8483 2.85737 19.1331 2.8773 22.2423 3.65268C22.7781 3.78629 23.1038 4.32791 22.9699 4.86241C22.836 5.39691 22.2931 5.7219 21.7573 5.58829C18.8666 4.86742 16.9015 4.88747 15.4308 5.20587C13.9555 5.52524 12.895 6.15867 11.7715 6.84363L11.6874 6.89494C10.6044 7.55565 9.40515 8.28729 7.82073 8.55069C6.17734 8.82388 4.23602 8.58235 1.62883 7.54187C1.11607 7.33724 0.866674 6.75667 1.0718 6.24513C1.27692 5.73359 1.85889 5.48479 2.37165 5.68943C4.76435 6.6443 6.32295 6.77699 7.492 6.58265C8.67888 6.38535 9.58373 5.83916 10.7286 5.14119C11.855 4.45445 13.1694 3.6538 15.0066 3.25608Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M22.2423 7.64302C19.1331 6.86765 16.8483 6.84772 15.0066 7.24642C13.1694 7.64415 11.855 8.44479 10.7286 9.13153C9.58373 9.8295 8.67888 10.3757 7.492 10.573C6.32295 10.7673 4.76435 10.6346 2.37165 9.67977C1.85889 9.47514 1.27692 9.72393 1.0718 10.2355C0.866674 10.747 1.11607 11.3276 1.62883 11.5322C4.23602 12.5727 6.17734 12.8142 7.82073 12.541C9.40515 12.2776 10.6044 11.546 11.6874 10.8853L11.7715 10.834C12.895 10.149 13.9555 9.51558 15.4308 9.19621C16.9015 8.87781 18.8666 8.85777 21.7573 9.57863C22.2931 9.71224 22.836 9.38726 22.9699 8.85275C23.1038 8.31825 22.7781 7.77663 22.2423 7.64302Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.9998 10.0266C18.6526 10.0266 18.3633 10.2059 18.1614 10.4772C18.0905 10.573 17.9266 10.7972 17.7089 11.111C17.4193 11.5283 17.0317 12.1082 16.6424 12.7555C16.255 13.3996 15.8553 14.128 15.5495 14.8397C15.2567 15.5213 14.9989 16.2614 14.9999 17.0117C15.0006 17.2223 15.0258 17.4339 15.0604 17.6412C15.1182 17.9872 15.2356 18.4636 15.4804 18.9521C15.7272 19.4446 16.1131 19.9674 16.7107 20.3648C17.3146 20.7664 18.0748 21 18.9998 21C19.9248 21 20.685 20.7664 21.2888 20.3648C21.8864 19.9674 22.2724 19.4446 22.5192 18.9522C22.764 18.4636 22.8815 17.9872 22.9393 17.6413C22.974 17.4337 22.9995 17.2215 22.9998 17.0107C23.0001 16.2604 22.743 15.5214 22.4501 14.8397C22.1444 14.128 21.7447 13.3996 21.3573 12.7555C20.968 12.1082 20.5803 11.5283 20.2907 11.111C20.073 10.7972 19.909 10.573 19.8382 10.4772C19.6363 10.2059 19.3469 10.0266 18.9998 10.0266ZM20.6119 15.6257C20.3552 15.0281 20.0049 14.3848 19.6423 13.782C19.4218 13.4154 19.2007 13.0702 18.9998 12.7674C18.7989 13.0702 18.5778 13.4154 18.3573 13.782C17.9948 14.3848 17.6445 15.0281 17.3878 15.6257L17.3732 15.6595C17.1965 16.0704 16.9877 16.5562 17.0001 17.0101C17.0121 17.3691 17.1088 17.7397 17.2693 18.0599C17.3974 18.3157 17.574 18.5411 17.8201 18.7048C18.06 18.8643 18.4248 19.0048 18.9998 19.0048C19.5748 19.0048 19.9396 18.8643 20.1795 18.7048C20.4256 18.5411 20.6022 18.3156 20.7304 18.0599C20.8909 17.7397 20.9876 17.3691 20.9996 17.01C21.0121 16.5563 20.8032 16.0705 20.6265 15.6597L20.6119 15.6257Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M14.1296 11.5308C14.8899 11.2847 15.4728 12.076 15.1153 12.7892C14.952 13.1151 14.7683 13.3924 14.4031 13.5214C13.426 13.8666 12.6166 14.3527 11.7715 14.8679L11.6874 14.9192C10.6044 15.5799 9.40516 16.3115 7.82074 16.5749C6.17735 16.8481 4.23604 16.6066 1.62884 15.5661C1.11608 15.3615 0.866688 14.7809 1.07181 14.2694C1.27694 13.7578 1.8589 13.509 2.37167 13.7137C4.76436 14.6685 6.32297 14.8012 7.49201 14.6069C8.67889 14.4096 9.58374 13.8634 10.7286 13.1654C11.8166 12.5021 12.9363 11.9171 14.1296 11.5308Z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                  <span
                    class="weather__others-label"
                    id="humidity"
                    aria-label="The location's humidity"
                    >${humidity}</span
                  >
                </div>

                <div class="weather__others-wrapper">
                  <svg
                    class="weather__others-icon weather__others-icon--wind"
                    aria-hidden="true"
                    viewBox="0 -1 28 28"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <title>Wind Speed</title>
                      <desc>Created with Sketch Beta.</desc>
                      <defs></defs>
                      <g
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                        sketch:type="MSPage"
                      >
                        <g
                          id="Icon-Set"
                          sketch:type="MSLayerGroup"
                          transform="translate(-466.000000, -830.000000)"
                          fill="currentColor"
                        >
                          <path
                            d="M488,844 L467,844 C466.447,844 466,844.447 466,845 C466,845.553 466.447,846 467,846 L486.833,846 C489.687,846 492,847.791 492,850 C492,852.209 490.291,854 486,854 L486,856 L488,856 C491.313,856 494,853.313 494,850 C494,846.687 491.313,844 488,844 L488,844 Z M480.002,848 L480,848 L472,848 C471.447,848 471,848.448 471,849 C471,849.553 471.447,850 472,850 L480,850 C481.104,850 482,850.896 482,852 C482,853.104 481.104,854 480,854 L480,856 C482.209,856 484,854.209 484,852 C484,849.792 482.21,848.002 480.002,848 L480.002,848 Z M475,838 L487,838 C487.553,838 488,837.553 488,837 C488,836.448 487.553,836 487,836 L475,836 C474.447,836 474,836.448 474,837 C474,837.553 474.447,838 475,838 L475,838 Z M470,842 L488,842 C491.313,842 494,839.313 494,836 C494,832.687 491.313,830 488,830 L488,832 C490.822,832.531 492,833.791 492,836 C492,838.209 489.687,840 486.833,840 L470,840 C469.447,840 469,840.448 469,841 C469,841.553 469.447,842 470,842 L470,842 Z"
                            sketch:type="MSShapeGroup"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span
                    class="weather__others-label"
                    id="wind"
                    aria-label="The location's wind speed"
                    >${windSpeed}</span
                  >
                </div>

                <div class="weather__others-wrapper">
                  <svg
                    class="weather__others-icon weather__others-icon--gust"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Wind Gust</title>
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <defs>
                        <style>
                          .cls-1 {
                            fill: none;
                          }
                        </style>
                      </defs>
                      <path
                        d="M29.3164,8.0513l-18-6A1,1,0,0,0,10.4,2.2L4,7V2H2V30H4V11l6.4,4.8a1,1,0,0,0,.9165.1489l18-6a1,1,0,0,0,0-1.8974ZM10,13,4.6665,9,10,5Zm4-.0542-2,.667V4.3872l2,.667Zm4-1.333-2,.6665V5.7207l2,.6665Zm2-.667V7.0542L25.8379,9Z"
                        transform="translate(0 0)"
                      ></path>
                      <path
                        d="M20,22a4,4,0,0,0-8,0h2a2,2,0,1,1,2,2H8v2h8A4.0045,4.0045,0,0,0,20,22Z"
                        transform="translate(0 0)"
                      ></path>
                      <path
                        d="M26,22a4.0045,4.0045,0,0,0-4,4h2a2,2,0,1,1,2,2H12v2H26a4,4,0,0,0,0-8Z"
                        transform="translate(0 0)"
                      ></path>
                      <rect
                        id="_Transparent_Rectangle_"
                        data-name="&lt;Transparent Rectangle&gt;"
                        class="cls-1"
                        width="32"
                        height="32"
                      ></rect>
                    </g>
                  </svg>
                  <span
                    class="weather__others-label"
                    id="wind-gust"
                    aria-label="The location's wind gust"
                    >${windGust}</span
                  >
                </div>
              </section>
    `;
    addFadeIn(weatherContainer);
  } catch (error) {
    const loadingSource = isDarkTheme()
      ? "./assets/img/connecting-dark_188x188.svg"
      : "./assets/img/connecting_188x188.svg";

    weatherContainer.innerHTML = `
      <img
      class="weather__loading"
      src="${loadingSource}"
      alt="Loading weather data."
      width="188"
      height="188"
      />
    `;

    alert("Something went wrong, please try again later");
  }
}

function isCitySelected() {
  return city.value !== "";
}

function showLoading() {
  const loadingSource = isDarkTheme()
    ? "./assets/img/connecting-dark_188x188.svg"
    : "./assets/img/connecting_188x188.svg";

  weatherContainer.innerHTML = `
      <img
      class="weather__loading pulse"
      src="${loadingSource}"
      alt="Loading weather data."
      width="188"
      height="188"
      />
    `;
}

function handleClickGetWeatherButton() {
  if (isCitySelected()) {
    showLoading();
    disableGetWeatherButton();
    disableSelect();
    setTimeout(() => {
      showWeather(city.value);
      enableGetWeatherButton();
      enableSelect();
    }, 1500);
  }

  return;
}

function initGetWeatherButton() {
  getWeatherButton.addEventListener("click", handleClickGetWeatherButton);
}

export function initWeather() {
  initGetWeatherButton();
  initSurprise();
}

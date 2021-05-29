import { createAutoComplete } from "./autocomplete.mjs";
import { config } from "./config.mjs";
import createProgressBar from "./progressBar.mjs";
import {
  generateAppLeft,
  generateForecast,
  weatherHighlights,
} from "./new_generate.mjs";

// DOM SELECTION - content generate containers
const appLeft = document.querySelector(".app-left-append");
const weatherData = document.querySelector(".weather-data");
const weatherInfo = document.querySelector(".weather-highlights-container");

// random city array
const randomCities = [
  [-118.242766, 34.0536909],
  [41.8756, -87.6244],
];

// initializing the autocomplete function
const autoCompleteConfig = {
  renderOption(city) {
    if (city.properties.state === undefined) {
      return `<i class='fas fa-map-marker-alt'></i>${city.properties.formatted}`;
    } else {
      return `<i class='fas fa-map-marker-alt'></i>${city.properties.city}, ${
        city.properties.state
      }, ${city.properties.country_code.toUpperCase()}`;
    }

    //<img src="${imgSrc}" />
  },

  inputValue(city) {
    return city.Title;
  },
  //using axios and async/await to fetch data from an API
  async fetchData(searchTerm) {
    const response = await axios.get(
      "https://api.geoapify.com/v1/geocode/autocomplete",
      {
        params: {
          apiKey: config.MAP_KEY,
          text: searchTerm,
          type: "city",
        },
      }
    );
    //handling the 'no city found' error, show no content
    if (response.data.Error) {
      return [];
    }

    return response.data.features;
  },
};

//using destructuring on autocomplete.js, we are able to pass these properties/methods as arguments
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#autocomplete"),
  onOptionSelect(city) {
    //document.querySelector(".tutorial").classList.add("is-hidden");
    onCitySelect(city, appLeft, weatherData, weatherInfo);
    //onCitySelect(city, currentCity);
  },
});
/* */

//grabbing the data from the weather api
const onCitySelect = async (city, appLeft, weatherData, weatherInfo) => {
  /*  let currentCity = `${
    city.properties.city
  }, ${city.properties.country_code.toUpperCase()}`; */
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/onecall?",
    {
      params: {
        lat: city.properties.lat,
        lon: city.properties.lon,
        appid: config.WEATHER_KEY,
        units: "metric",
      },
    }
  );
  console.log(response);
  /* //setting default temp to celcius when searching to prevent error, not the nicest fix though...
  document.getElementById("unit").checked = false;
  document.querySelector("#unit-name").innerHTML = "Celcius";
  //appending the HTML generator to the HTML
  currentWeatherElement.innerHTML = generateCurrentData(response.data);
  currentCityElement.innerHTML = generateCurrentCity(
    currentCity,
    response.data
  );
  forecastContainer.innerHTML = "";
  generateForecast(response.data); */
  appLeft.innerHTML = await generateAppLeft(response.data);
  await document
    .querySelector(".weather-icon")
    .classList.add("current-weather-icon");
  weatherData.innerHTML = await generateForecast(response.data);
  weatherInfo.innerHTML = await weatherHighlights(response.data);
  createProgressBar(Math.floor(response.data.current.uvi + 1));
};

// load random city on page load

// initiliazie map
var mymap = L.map("mapid").setView([51.505, -0.09], 11);
L.marker([51.505, -0.09]).addTo(mymap);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,

    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoibGVvdjk1IiwiYSI6ImNrcDluaG41bjBpamwydm56MmE5am00cGYifQ.3RHmdQSpubg12QicMl-uqw",
  }
).addTo(mymap);

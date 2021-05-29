import { createAutoComplete } from "./autocomplete.mjs";
import { config } from "./config.mjs";
import createProgressBar from "./progressBar.mjs";
import {
  generateAppLeft,
  generateForecast,
  generateHourly,
  weatherHighlights,
} from "./new_generate.mjs";
import createMap from "./map.mjs";
// DOM SELECTION - content generate containers
const appLeft = document.querySelector(".app-left-append");
const weatherData = document.querySelector("#display-daily");
const weatherDataHourly = document.querySelector("#display-current");
const weatherInfo = document.querySelector(".weather-highlights-container");

//console.log(weatherDataHourly.innerHTML);
// random city array
const randomCities = [
  // may need to change format
  [21.0294498, 105.8544441],
  [51.5073219, -0.1276474],
  [34.0536909, -118.242766],
  [-87.6244, 41.8756],
  [47.6038321, -122.3300624],
  [40.7127281, -74.0060152],
  [13.7544238, 100.4930399],
  [-34.6075682, -58.4370894],
  [43.6534817, -79.3839347],
  [55.7504461, 37.6174943],
  [48.8566969, 2.3514616],
  [52.5170365, 13.3888599],
  [27.708317, 85.3205817],
  [28.6138954, 77.2090057],
  [-33.8548157, 151.2164539],
  [30.0443879, 31.2357257],
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
    // console.log(city.properties);
    const { lat, lon } = city.properties;

    // const { lon } = city.properties;

    //document.querySelector(".tutorial").classList.add("is-hidden");
    onCitySelect(
      lat,
      lon,
      appLeft,
      weatherData,
      weatherInfo,
      weatherDataHourly
    );
  },
});
/* */

//grabbing the data from the weather api
const onCitySelect = async (
  lat,
  lon,
  appLeft,
  weatherData,
  weatherInfo,
  weatherDataHourly
) => {
  /*  let currentCity = `${
    city.properties.city
  }, ${city.properties.country_code.toUpperCase()}`; */
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/onecall?",
    {
      params: {
        lat: lat,
        lon: lon,
        appid: config.WEATHER_KEY,
        units: "metric",
      },
    }
  );
  /* //setting default temp to celcius when searching to prevent error, not the nicest fix though...
  document.getElementById("unit").checked = false;
  document.querySelector("#unit-name").innerHTML = "Celcius";
 */
  console.log(response.data);
  appLeft.innerHTML = await generateAppLeft(response.data);
  // change main weather icon
  await document
    .querySelector(".weather-icon")
    .classList.add("current-weather-icon");
  // handle map generator here
  await createMap(response.data.lat, response.data.lon);
  weatherData.innerHTML = await generateForecast(response.data);
  weatherDataHourly.innerHTML = await generateHourly(response.data);
  weatherInfo.innerHTML = await weatherHighlights(response.data);
  createProgressBar(Math.floor(response.data.current.uvi + 1));
};

// load random city on page load
function loadOnStartup(arr) {
  const rand = Math.round(Math.random() * arr.length);
  const lat = arr[rand][0];
  const lon = arr[rand][1];

  onCitySelect(lat, lon, appLeft, weatherData, weatherInfo, weatherDataHourly);
}

loadOnStartup(randomCities);

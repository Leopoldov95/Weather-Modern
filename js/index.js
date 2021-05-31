import { createAutoComplete } from "./autocomplete.mjs";
import { randomCities } from "./random.mjs";
import { config } from "./config.mjs";
import createProgressBar from "./progressBar.mjs";
import {
  generateAppLeft,
  generateForecast,
  generateHourly,
  weatherHighlights,
} from "./generate.mjs";
import createMap from "./map.mjs";
// DOM SELECTION - content generate containers
const appLeft = document.querySelector(".app-left-append");
const weatherData = document.querySelector("#display-daily");
const weatherDataHourly = document.querySelector("#display-current");
const weatherInfo = document.querySelector(".weather-highlights-container");

//console.log(weatherDataHourly.innerHTML);
// random city array

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
    console.log(response);
    return response.data.features;
  },
};

//using destructuring on autocomplete.js, we are able to pass these properties/methods as arguments
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector("#autocomplete"),
  onOptionSelect(selected) {
    // console.log(city.properties);
    //const { lat, lon } = selected.properties;
    // console.log(selected);
    const res = selected;
    // const { city, state, country_code } = await selected.properties;
    // use this to generate lat and lon and display current location
    //const selectedCity = await selected.properties;
    /* const searchResults = selected.properties;
    console.log(searchResults); */
    // const { lon } = city.properties;
    console.log(res);

    //document.querySelector(".tutorial").classList.add("is-hidden");
    onCitySelect(res, appLeft, weatherData, weatherInfo, weatherDataHourly);
  },
});
/* */
// change this unit based upon btn select

function checkUnit() {
  if (document.querySelector("#c-btn").classList.contains("selected")) {
    return "metric";
  } else {
    return "imperial";
  }
}

//grabbing the data from the weather api
const onCitySelect = async (
  res,
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
        lat: res.properties.lat,
        lon: res.properties.lon,
        appid: config.WEATHER_KEY,
        units: checkUnit(),
      },
    }
  );
  /* //setting default temp to celcius when searching to prevent error, not the nicest fix though...
  document.getElementById("unit").checked = false;
  document.querySelector("#unit-name").innerHTML = "Celcius";
 */
  console.log(response.data);
  appLeft.innerHTML = await generateAppLeft(response.data, res);
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
async function loadOnStartup(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  const lat = arr[rand][0];
  const lon = arr[rand][1];
  // anoying but couldnt fina another solution to get name, state, and country
  const res = await axios.get(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${config.MAP_KEY}`
  );
  //handling the 'no city found' error, show no content
  if (res.data.Error) {
    return [];
  }
  // console.log(res.data.features[0]);

  onCitySelect(
    res.data.features[0],
    appLeft,
    weatherData,
    weatherInfo,
    weatherDataHourly
  );
}

loadOnStartup(randomCities);

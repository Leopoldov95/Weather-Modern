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
  onOptionSelect(selected) {
    const res = selected;
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
  if (window.innerWidth <= 560) {
    console.log("screen width is less than 560px");
    const newHeight = document.querySelector("#app-wrapper").scrollHeight;
    console.log(newHeight);
    document.querySelector(".current-city").style.top = `${newHeight}px`;
    //document.querySelector(".current-city").style.top = `"${newHeight}px;"`;
  }
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

  onCitySelect(
    res.data.features[0],
    appLeft,
    weatherData,
    weatherInfo,
    weatherDataHourly
  );
}

loadOnStartup(randomCities);

window.addEventListener("resize", () => {
  if (window.innerWidth < 560) {
    const newHeight = document.querySelector("#app-wrapper").scrollHeight;
    console.log(newHeight);
    document.querySelector(".current-city").style.top = `${newHeight}px`;
  }
});

// DOM selectors
const currentContainer = document.querySelector(".current-weather .container");
const forecastContainer = document.querySelector(
  ".weather-forecast .container"
);
const currentCityContainer = document.querySelector(".current-city");

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
    onCitySelect(
      city,
      currentContainer,
      currentCityContainer,
      forecastContainer
    );
    //onCitySelect(city, currentCity);
  },
});
/* */

//grabbing the data from the weather api
const onCitySelect = async (
  city,
  currentWeatherElement,
  currentCityElement
) => {
  let currentCity = `${
    city.properties.city
  }, ${city.properties.country_code.toUpperCase()}`;
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
  //setting default temp to celcius when searching to prevent error, not the nicest fix though...
  document.getElementById("unit").checked = false;
  document.querySelector("#unit-name").innerHTML = "Celcius";
  //appending the HTML generator to the HTML
  currentWeatherElement.innerHTML = generateCurrentData(response.data);
  currentCityElement.innerHTML = generateCurrentCity(
    currentCity,
    response.data
  );
  forecastContainer.innerHTML = "";
  generateForecast(response.data);
};

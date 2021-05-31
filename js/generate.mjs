import { getWeatherIcon, humidityIcon, visibilityIcon } from "./weather.mjs";
import createProgressBar from "./progressBar.mjs";

// rain atttribute?

const generateAppLeft = async (data, res) => {
  const offset = await data.timezone_offset;
  const { city, state, country_code } = await res.properties;
  const { dt, temp, weather, clouds } = await data.current;
  const formattedTemp = Math.round(temp);
  const getTime = new Date((dt + offset) * 1000);
  const day = getTime
    .toLocaleDateString("en-us", {
      timeZone: "UTC",
      weekday: "long",
    })
    .slice(0, 3);
  const time = getTime.toLocaleString("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  //const time
  document.querySelector(
    ".app-left"
  ).style.background = `url('./img/${weather[0].icon}.jpg') no-repeat center center/cover`;
  const icon = await getWeatherIcon(weather);
  const lightText = [
    "01n",
    "02n",
    "03n",
    "04n",
    "10n",
    "09n",
    "13n",
    "13d",
    "09d",
    "10d",
  ];
  if (lightText.indexOf(weather[0].icon) !== -1) {
    document.querySelector(".app-left").style.color = "white";
  } else {
    document.querySelector(".app-left").style.color = "black";
  }

  return `
    <div class="current-weather">
          <div id="current-weather-icon">
            ${icon}
          </div>
          <div>
            <h1><span class='temp-format' >${formattedTemp}</span><span class='unit-symbol'>${
    document.querySelector("#c-btn").classList.contains("selected")
      ? "&#8451"
      : "&#8457"
  };</span></h1>
            <h4>${day}, <span>${time}</span></h4>
          </div>
        </div>
        <div class="current-info">
        <h4><strong>${city}, ${
    state === undefined ? "" : `${state},`
  } ${country_code.toUpperCase()}</strong></h4>
         <h2>${weather[0].description}</h2> 
        <div><i class="fas fa-cloud"></i> <span>Cloud Cover - ${clouds}%</span></div>
        </div>
        <div class="current-city">
        <div id="mapid"></div>
        </div>
    `;
};

const generateForecast = async (data) => {
  const forecast = [];
  const offset = await data.timezone_offset;
  const week = await data.daily.slice(1, data.daily.length);

  for (let item of week) {
    const { dt, temp, weather } = item;
    const highTemp = Math.round(temp.max);
    const lowTemp = Math.round(temp.min);
    // const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const icon = await getWeatherIcon(weather);

    const getTime = new Date((dt + offset) * 1000);
    const day = getTime
      .toLocaleDateString("en-us", {
        timeZone: "UTC",
        weekday: "long",
      })
      .slice(0, 3);

    forecast.push(`
    <div class="card">
    <h3>${day}</h3>
    <div>
      ${icon}
    </div>
    <h3><span class='temp-format'>${highTemp}</span><span class="unit-format">&#176;</span><span class="font-light"><span class='temp-format'>${lowTemp}</span><span class="unit-format">&#176;</span></span></h3>
    </div>
    `);
  }
  const markup = forecast.join("");

  return markup;
};
const generateHourly = async (data) => {
  const hourly = [];
  const offset = await data.timezone_offset;

  const hour = await data.hourly.slice(1, 13);

  for (let item of hour) {
    const { dt, temp, weather } = item;

    // const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const icon = await getWeatherIcon(weather);

    const getTime = new Date((dt + offset) * 1000);

    const time = getTime.toLocaleString("en-US", {
      timeZone: "UTC",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    hourly.push(`
    <div class="card">
    <h3>${time}</h3>
    <div>
      ${icon}
    </div>
    <h3><span class='temp-format'>${Math.round(
      temp
    )}</span><span class="unit-format">&#176;</span></span></h3>
    </div>
    `);
  }
  const markup = hourly.join("");

  return markup;
};

const weatherHighlights = async (data) => {
  // for testing, will handle in seperate file
  const { morn, night, day } = await data.daily[0].temp;

  const offset = await data.timezone_offset;
  const { humidity, sunrise, sunset, visibility, wind_deg, wind_speed } =
    await data.current;
  const readSunrise = new Date((sunrise + offset) * 1000);
  const readSunset = new Date((sunset + offset) * 1000);

  return `
  <div class="big-card uv-info">
              <div><h3>UV Index</h3></div>
              <div id="container"></div>
            </div>
            <div class="big-card wind-info">
              <div>
                <h3>Wind Status</h3>
              </div>

              <div>
                <h1 class="wind_format">${Math.round(
                  wind_speed
                )}<span class="speed_format">km/h</span></h1>
              </div>
              <div class="wind-direction">
                <i class="fas fa-map-marker-alt"></i>
                <h3>WSW</h3>
              </div>
            </div>
            <div class="big-card sun-info">
              <h3>Sunrise & Sunset</h3>
              <div>
                <div>
                  <i class="sun-icon fas fa-arrow-up"></i>
                </div>
                <div>${readSunrise.toLocaleString("en-US", {
                  timeZone: "UTC",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}</div>
              </div>
              <div>
                <div>
                  <i class="sun-icon fas fa-arrow-down"></i>
                </div>
                <div>${readSunset.toLocaleString("en-US", {
                  timeZone: "UTC",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}</div>
              </div>
            </div>
            <div class="big-card humidity-info">
              <h3>Humidity</h3>
              <div>
                <h1>${humidity}<span>%</span></h1>
                <div class="vertical-bar">
                  <span class="bar-meter"></span>
                </div>
              </div>
              <span>${humidityIcon(humidity)}</span>
            </div>
            <div class="big-card visibility-info">
              <h3>Visibility</h3>
              <h1>${visibility / 1000}<span class='dist-format'>km</span></h1>
              <span>${visibilityIcon(visibility / 1000)}</span>
            </div>
            <div class="big-card air-info">
              <h3>Feels Like</h3>
              <div class="feels-like">
                <div>
               <span><i class="bg-morn fas fa-circle"></i> Morning - </span><span><span class='temp-format'>${Math.round(
                 morn
               )}</span><span class="unit-format">&#176;</span></span> 
               </div>
               <div>
               <span><i class="bg-day fas fa-sun"></i> Day - </span><span><span class='temp-format'>${Math.round(
                 day
               )}</span><span class="unit-format">&#176;</span></span> 
               </div>
               <div>
               <span><i class="bg-night fas fa-moon"></i> Night - </span><span><span class='temp-format'>${Math.round(
                 night
               )}</span><span class="unit-format">&#176;<span></span> 
               </div>
                </div>
              </div>
            </div>
             
          </div>
  `;
};

export { generateAppLeft, generateForecast, generateHourly, weatherHighlights };
// <img src="${icon}" alt="main_weather" />

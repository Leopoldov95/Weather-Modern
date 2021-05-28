import { getWeatherIcon } from "./weather.mjs";
import createProgressBar from "./progressBar.mjs";

// rain atttribute?
const generateAppLeft = async (data) => {
  const { temp, weather, clouds } = await data.current;
  const formattedTemp = Math.round(temp);
  const icon = await getWeatherIcon(weather);

  return `
    <div class="current-weather">
          <div id="current-weather-icon">
            ${icon}
          </div>
          <div>
            <h1>${formattedTemp}<span>&#8451;</span></h1>
            <h4>Monday, <span>16:00</span></h4>
          </div>
        </div>
        <div class="current-info">
         <p>${weather[0].description}</p> 
        <div><i class="fas fa-cloud"></i> <span>${clouds}%</span></div>
        </div>
        <div class="current-city">
          <h3><i class="fas fa-map-marker-alt"></i>New York, NY, USA</h3>
        </div>
    `;
};

const generateForecast = async (data) => {
  const forecast = [];
  for (let item of await data.daily) {
    const { dt, temp, weather } = item;
    const highTemp = Math.round(temp.max);
    const lowTemp = Math.round(temp.min);
    // const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const icon = await getWeatherIcon(weather);

    const getTime = new Date(dt * 1000);
    const day = getTime
      .toLocaleDateString("en-us", { weekday: "long" })
      .slice(0, 3);

    forecast.push(`
    <div class="card">
    <h3>${day}</h3>
    <div>
      ${icon}
    </div>
    <h3>${highTemp}&#176;<span class="font-light">${lowTemp}&#176;</span></h3>
    </div>
    `);
  }
  const markup = forecast.join("");

  return markup;
};

const weatherHighlights = async (data) => {
  // for testing, will handle in seperate file

  const { humidity, sunrise, sunset, uvi, visibility, wind_deg, wind_speed } =
    await data.current;

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
                <h1>${Math.round(wind_speed)}<span>km/h</span></h1>
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
                <div>${sunrise.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}</div>
              </div>
              <div>
                <div>
                  <i class="sun-icon fas fa-arrow-down"></i>
                </div>
                <div>${sunset.toLocaleString("en-US", {
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
              <span>Normal 🤙</span>
            </div>
            <div class="big-card visibility-info">
              <h3>Visibility</h3>
              <h1>${visibility / 1000}<span>km</span></h1>
              <span>Average 😐</span>
            </div>
            <div class="big-card air-info">
              <h3>Air Quality</h3>
              <div >
                <h1>105</h1>
                <div class="vertical-bar">
                  <span class="bar-meter"></span>
                </div>
              </div>
              <span>Unhealthy 👎</span>
            </div>
  `;
};

export { generateAppLeft, generateForecast, weatherHighlights };
// <img src="${icon}" alt="main_weather" />

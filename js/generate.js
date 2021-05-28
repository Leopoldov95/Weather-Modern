const generateCurrentData = (data) => {
  const { feels_like, temp, weather, wind_speed } = data.current;
  const formattedTemp = Math.round(temp);
  const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const currentDate = new Date();
  return `
    <div class='current-weather-card p-1'>
      <div class="current-weather-left">
        <div>
          <h2>Current Weather</h2>
          <h4>${currentDate.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}</h4>
          </div>
        <div class="current-weather-info">
          <div>
          <img class="city-icon" src="${icon}" alt="${
    weather[0]["description"]
  }">
          </div>
          <div class="current-temp-info">
       
            <div>
               <h1 class="unit-temp">${formattedTemp /*  farenheight() */}</h1>
               <div> 
                 <div class="current-temp-sup">
            <sup>°</sup>
          </div>
          <div class="current-temp-sub">
            <sub class="symbol">C</sub>
          </div>
               </div>
            </div>
        </div>
      </div>
      <div>
        <h3>${weather[0].main}</h3>
      </div>
            </div>
            <div class="current-weather-right">
              <div class="current-weather-description underline-bottom">
                <div><p class='description-text'>Description</p></div>
                <div><p>${weather[0].description}</p></div>
              </div>
              <div class="current-weather-description underline-bottom">
                <div><p class='description-text'>Feels Like</p></div>
                <div><p ><span class="unit-temp">${Math.round(
                  feels_like
                )}</span>°<sup class="symbol">c</sup></p></div>
              </div>
              <div class="current-weather-description">
                <div><p class='description-text'>Wind</p></div>
                <div><p><span class="wind-speed">${Math.round(
                  wind_speed
                )}</span> <span class="speed-unit">KPH</span></p></div>
              </div>
            </div>
          </div>
    `;
};

const generateCurrentCity = (currentCity, data) => {
  const { temp, weather } = data.current;
  const formattedTemp = Math.round(temp);
  const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return `
    <h2 >${currentCity} &nbsp;<span class="unit-temp">${formattedTemp}</span>°<span class="symbol">c</span></h2>
    <img class="city-icon" style="height: 60px" src="${icon}" alt="${weather[0]["description"]}">
  `;
};

const generateForecast = (data) => {
  let forecastData = data.daily.shift();

  //let updatedData = forecastData.shift();

  for (let item of data.daily) {
    const { dt, humidity, temp, weather } = item;
    const formattedTemp = Math.round(temp.max);
    const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    const getTime = new Date(dt * 1000);
    const day = getTime
      .toLocaleDateString("en-us", { weekday: "long" })
      .slice(0, 3);
    const month = getTime.getMonth() + 1;
    const date = getTime.getDate();

    const div = document.createElement("div");
    div.classList.add("forecast-card", "p-1");
    const markup = `
    
          <div class="forecast-info-container">
            <div class="forecast-date">
              <h3>${day}</h3>
              <h3>${month}/${date}</h3>
            </div>
            <div class="forecast-icon">
            <img class="forecast-img" src="${icon}" alt="${weather[0]["description"]}">
            </div>
            <div class="forecast-temp">
              <h1><span class="unit-temp">${formattedTemp}</span><sup>°</sup><span class="symbol">c</span></h1>
            </div>
            <div class="forecast-description">
              <p>${weather[0].description}</p>
            </div>
          </div>
          <div>
            <div class="forecast-prec">
              <i class="fas fa-tint"></i><span>${humidity}%</span>
            </div>
          </div>
       
  `;
    div.innerHTML = markup;
    forecastContainer.appendChild(div);
  }
};

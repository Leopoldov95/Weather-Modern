const generateAppLeft = (data) => {
  const { temp, weather, humidity } = data.current;
  const formattedTemp = Math.round(temp);
  const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const currentDate = new Date();
  return `
    <div class="current-weather">
          <div>
            <img src="${icon}" alt="main_weather" />
          </div>
          <div>
            <h1>${formattedTemp}<span>&#8451;</span></h1>
            <h4>Monday, <span>16:00</span></h4>
          </div>
        </div>
        <div class="current-info">
          <div><img src="${icon}" alt="weather_desc"/> <span>${weather[0].description}</span></div>
          <div><i class="fas fa-tint"></i> <span>Humidity - ${humidity}%</span></div>
        </div>
        <div class="current-city">
          <h3><i class="fas fa-map-marker-alt"></i>New York, NY, USA</h3>
        </div>
    `;
};

export { generateAppLeft };

const weatherIcons = {
  nightThunder: () => {
    return `
        <div class="weather-icon w1">
  <div class="cloud"></div>
  <div class="thunder"></div>
  <div class="moon small-moon"></div>
  <div class="rain">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
        `;
  },

  dayThunder: () => {
    return `
        <div class="weather-icon w5">
  <div class="cloud"></div>
  <div class="thunder"></div>
  <div class="sun small-sun"></div>
  <div class="rain">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
        `;
  },
  nightSnow: () => {
    return `
        <div class="weather-icon w2">
  <div class="cloud"></div>
  <div class="moon small-moon"></div>
  <div class="hailstorm">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
        `;
  },
  sunSnow: () => {
    return `
        <div class="weather-icon w3">
  <div class="cloud"></div>
  <div class="sun small-sun"></div>
  <div class="hailstorm">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
        `;
  },
  dayCloudy: () => {
    return `
    <div class="weather-icon w14">
    <div class="cloud medium-cloud"></div>
    <div class="sun"></div>
  </div>
        `;
  },
  nightCloudy: () => {
    return `
    <div class="weather-icon w13">
    <div class="cloud medium-cloud"></div>
    <div class="moon"></div>
  </div>
        `;
  },
  dayScatteredClouds: () => {
    return `
      <div class="weather-icon w11">
  <div class="cloud"></div>
  <div class="sun small-sun"></div>
</div>
      `;
  },
  nightScatteredClouds: () => {
    return `
    <div class="weather-icon w11">
  <div class="cloud"></div>
  <div class="moon small-moon"></div>
</div>

    `;
  },
  nightRain: () => {
    return `
        <div class="weather-icon w6">
  <div class="cloud"></div>
  <div class="moon small-moon"></div>
  <div class="rain">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
        `;
  },
  dayRain: () => {
    return `
        <div class="weather-icon w7">
  <div class="cloud"></div>
  <div class="sun small-sun"></div>
  <div class="rain">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
        `;
  },

  dayClear: () => {
    return `
        <div class="weather-icon w15">
  <div class="sun"></div>
</div>

        `;
  },

  nightClear: () => {
    return `
        <div class="weather-icon w16">
  <div class="moon"></div>
</div>
        `;
  },

  nightBrokenClouds: () => {
    return `
      <div class="weather-icon w10">
  <div class="moon small-moon"></div>
  <div class="cloud"></div>
  <div class="cloud forefront"></div>
</div>
      `;
  },
  dayBrokenClouds: () => {
    return `
      <div class="weather-icon w10">
  <div class="sun small-sun"></div>
  <div class="cloud"></div>
  <div class="cloud forefront"></div>
</div>
      `;
  },
  mist: () => {
    return `
      <div class="weather-icon w10">
  <div class="cloud"></div>
  <div class="cloud forefront mist"></div>
</div>
      `;
  },
};

const getWeatherIcon = (data) => {
  const weather = data[0].icon;
  switch (weather) {
    case "01d":
      return weatherIcons.dayClear();
    case "01n":
      return weatherIcons.nightClear();
    case "02d":
      return weatherIcons.dayCloudy();
    case "02n":
      return weatherIcons.nightCloudy();
    case "03d":
      return weatherIcons.dayScatteredClouds();
    case "03n":
      return weatherIcons.nightScatteredClouds();
    case "04d":
      return weatherIcons.dayBrokenClouds();
    case "04n":
      return weatherIcons.nightBrokenClouds();
    case "09d":
      return weatherIcons.dayRain();
    case "09n":
      return weatherIcons.nightRain();
    case "10d":
      return weatherIcons.dayRain();
    case "10n":
      return weatherIcons.nightRain();
    case "11d":
      return weatherIcons.dayThunder();
    case "11n":
      return weatherIcons.nightThunder();
    case "13d":
      return weatherIcons.sunSnow();
    case "13n":
      return weatherIcons.nightSnow();
    case "50d":
      return weatherIcons.mist();
    case "50n":
      return weatherIcons.mist();
  }
};

export { getWeatherIcon };

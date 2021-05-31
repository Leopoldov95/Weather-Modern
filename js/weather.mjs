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

const visibilityIcon = (data) => {
  if (data < 4) {
    return "Poor ☹️";
  } else if (data < 7) {
    return "Normal 😐";
  } else {
    return "Good 😀";
  }
};

const humidityIcon = (data) => {
  if (data < 34) {
    return "Feels Good 👍";
  } else if (data < 67) {
    return "Normal 🤙";
  } else {
    return "Hot & Sticky 😓";
  }
};

const getWindDir = (data) => {
  if (data >= 350 || data <= 10) {
    return `NORTH`;
  } else if (data <= 30) {
    return `NNE`;
  } else if (data <= 50) {
    return `NE`;
  } else if (data <= 70) {
    return "ENE";
  } else if (data <= 100) {
    return "EAST";
  } else if (data <= 120) {
    return "ESE";
  } else if (data <= 140) {
    return "SE";
  } else if (data <= 160) {
    return "SSE";
  } else if (data <= 190) {
    return "SOUTH";
  } else if (data <= 210) {
    return "SSW";
  } else if (data <= 230) {
    return "SW";
  } else if (data <= 250) {
    return "WSW";
  } else if (data <= 280) {
    return "WEST";
  } else if (data < 300) {
    return "WNW";
  } else if (data < 320) {
    return "NW";
  } else {
    return "NNW";
  }
};

export { getWeatherIcon, visibilityIcon, humidityIcon, getWindDir };

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

export { weatherIcons };

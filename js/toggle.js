// handle weekly and hourly toggle as well as C and F toggle
const hourlyBtn = document.querySelector("#hourly");
const weeklyBtn = document.querySelector("#daily");
// want to make butons more usable, also change the way requests are sent
const celciusBtn = document.querySelector("#c-btn");
const farenheightBtn = document.querySelector("#f-btn");

hourlyBtn.addEventListener("click", () => {
  if (hourlyBtn.classList.contains("active")) {
    return;
  } else {
    hourlyBtn.classList.add("active");
    weeklyBtn.classList.remove("active");
    document.querySelector("#display-current").style.display = "flex";
    document.querySelector("#display-daily").style.display = "none";
  }
});

weeklyBtn.addEventListener("click", () => {
  if (weeklyBtn.classList.contains("active")) {
    return;
  } else {
    weeklyBtn.classList.add("active");
    hourlyBtn.classList.remove("active");
    document.querySelector("#display-current").style.display = "none";
    document.querySelector("#display-daily").style.display = "flex";
  }
});

celciusBtn.addEventListener("click", () => {
  if (celciusBtn.classList.contains("selected")) {
    return;
  } else {
    farenheightBtn.classList.remove("selected");
    celciusBtn.classList.add("selected");
    //convertToCelcius
    convertToCelcius(document.querySelectorAll(".temp-format"));
    document.querySelector(".unit-symbol").innerHTML = "&#8451";
    const newFormat = `<span class="format-visibility-num">
      ${
        Number(document.querySelector(".format-visibility-num").innerHTML) * 1.6
      }</span>Km`;
    document.querySelector(".format-visibility").innerHTML = newFormat;
    const newWindNum = `<span class='wind_format_num'>${
      Number(document.querySelector(".wind_format_num").innerHTML) * 1.6
    }</span>km/h`;
    document.querySelector(".wind_format").innerHTML = newWindNum;
  }
});
farenheightBtn.addEventListener("click", () => {
  if (farenheightBtn.classList.contains("selected")) {
    return;
  } else {
    celciusBtn.classList.remove("selected");
    farenheightBtn.classList.add("selected");
    // convertTofarenheight
    convertTofarenheight(document.querySelectorAll(".temp-format"));
    document.querySelector(".unit-symbol").innerHTML = "&#8457";
    const newFormat = `<span class="format-visibility-num">${
      Number(document.querySelector(".format-visibility-num").innerHTML) / 1.6
    }</span>Mi`;
    document.querySelector(".format-visibility").innerHTML = newFormat;
    const newWindNum = `<span class='wind_format_num'>${
      Number(document.querySelector(".wind_format_num").innerHTML) / 1.6
    }</span>mp/h`;
    document.querySelector(".wind_format").innerHTML = newWindNum;
  }
});

function convertToCelcius(el) {
  for (let i of el) {
    i.innerHTML = Math.round((Number(i.innerHTML) - 32) * (5 / 9));
  }
}

function convertTofarenheight(el) {
  for (let i of el) {
    i.innerHTML = Math.round(Number(i.innerHTML) * (9 / 5) + 32);
  }
}

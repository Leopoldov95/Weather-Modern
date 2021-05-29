// handle weekly and hourly toggle as well as C and F toggle
const hourlyBtn = document.querySelector("#hourly");
const weeklyBtn = document.querySelector("#daily");

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

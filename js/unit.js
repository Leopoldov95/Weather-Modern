// May want to refactor this mess

const toggle = () => {
  let x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
};

////checking for unit switching//////

document.getElementById("unit").addEventListener("click", () => {
  //changing text when clicking switch
  if (document.getElementById("unit").checked === false) {
    document.querySelector("#unit-name").innerHTML = "Celcius";
  } else {
    document.querySelector("#unit-name").innerHTML = "Fahrenheit";
  }
  //changing units when clicked
  if (document.querySelector(".unit-temp")) {
    if (document.getElementById("unit").checked === false) {
      changeUnitLetter();
      changeWind();
      //document.querySelector("#unit-name").innerHTML = "Celcius";
      for (let temp of document.querySelectorAll(".unit-temp")) {
        temp.innerHTML = unitChecker("c", parseInt(temp.innerHTML));
      }
    } else if (document.getElementById("unit").checked === true) {
      changeUnitLetter();
      changeWind();
      //document.querySelector("#unit-name").innerHTML = "Fahrenheit";
      for (let temp of document.querySelectorAll(".unit-temp")) {
        temp.innerHTML = unitChecker("f", parseInt(temp.innerHTML));
      }
    }
  } else {
    console.log("Please select a city first");
  }
});

function unitChecker(unit, temp) {
  if (unit === "c") {
    return Math.round((temp - 32) * (5 / 9));
  } else if (unit === "f") {
    return Math.round((temp * 9) / 5 + 32);
  }
}

function changeUnitLetter() {
  for (let symbol of document.querySelectorAll(".symbol")) {
    if (document.querySelector("#unit-name").innerHTML === "Celcius") {
      symbol.innerHTML = "c";
    } else {
      symbol.innerHTML = "F";
    }
  }
}

function changeWind() {
  if (document.querySelector("#unit-name").innerHTML === "Fahrenheit") {
    document.querySelector(".wind-speed").innerHTML = Math.round(
      parseFloat(document.querySelector(".wind-speed").innerHTML) / 1.609
    );
    document.querySelector(".speed-unit").innerHTML = "MPH";
  } else {
    document.querySelector(".wind-speed").innerHTML = Math.round(
      parseFloat(document.querySelector(".wind-speed").innerHTML) * 1.609
    );
    document.querySelector(".speed-unit").innerHTML = "KPH";
  }
}

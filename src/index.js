let now = new Date();

let daySelect = document.querySelector("#day");
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
daySelect.innerHTML = days[now.getDay()];

let month = document.querySelector("#month");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
month.innerHTML = months[now.getMonth()];
let dataSelect = document.getElementById("data");
dataSelect.innerHTML = now.getDate();
let hoursSelect = document.querySelector("#hours");
let hours = now.getHours();
if (hours < 10) {
  hoursSelect.innerHTML = `0${hours}`;
} else {
  hoursSelect.innerHTML = `${hours}`;
}
let minutesSelect = document.querySelector("#minutes");
let minutes = now.getMinutes();
if (minutes > 10) {
  minutesSelect.innerHTML = `${minutes}`;
} else {
  minutesSelect.innerHTML = `0${minutes}`;
}

// d157498ee204d93dde56608fb4800c07

function showWeather(response) {
  let city = response.data.name;
  let cityChoose = document.querySelector("#city");
  cityChoose.innerHTML = `${city}`;

  let currTemp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  currTemp.innerHTML = `${temperature}`;

  let wind = document.querySelector("#data-wind");
  let windspeed = Math.round(response.data.wind.speed);
  wind.innerHTML = windspeed;
  let hum = document.querySelector("#data-humidity");
  let humidity = Math.round(response.data.main.humidity);
  hum.innerHTML = humidity;
  let iconElement = document.querySelector("#data-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#enterCity");
  let cityChoose = document.querySelector("#city");
  if (enterCity.value) {
    cityChoose.innerHTML = enterCity.value.toUpperCase();
    let apiKey = "d157498ee204d93dde56608fb4800c07";
    let city = enterCity.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  } else {
    cityChoose.innerHTML = null;
    alert(`Please enter a city!`);
  }
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
//

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d157498ee204d93dde56608fb4800c07";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function navigatorLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentCity = document.querySelector("#current-location");
currentCity.addEventListener("click", navigatorLoc);

////

function switchTemp(event) {
  event.preventDefault();

  let tempHTML = document.querySelector("#temperature");
  let metric = document.querySelector(".celsiusfar-a");
  let otherMetric = document.querySelector(".celsiusfar");

  if (metric.innerHTML === "°C") {
    let celsius = document.querySelector("#temperature").innerHTML;
    let farenheit = Math.round(1.8 * celsius + 32);
    tempHTML.innerHTML = farenheit;
    metric.innerHTML = "°F";
    otherMetric.innerHTML = "°C";
  } else {
    let farenheit = document.querySelector("#temperature").innerHTML;
    let newcalc = Math.round((farenheit - 32) / 1.8);
    tempHTML.innerHTML = newcalc;
    metric.innerHTML = "°C";
    otherMetric.innerHTML = "°F";
  }
}

let changeMetric = document.querySelector(".celsiusfar");
changeMetric.addEventListener("click", switchTemp);
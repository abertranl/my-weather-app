function displayForecast(response) {
  console.log(response.data);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML += `<div class="forecast-day">
          <div class="forecast-day">${day}</div>
          <div class="forecast-icon">🌤️</div>
          <div class="forecast-temp"><strong>26º</strong> &nbsp; 12º</div>
        </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

function displayNewInfo(response) {
  let temperatureElement = document.querySelector("#current-temperature-value");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let iconElement = document.querySelector("#current-temperature-icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

  let description = response.data.condition.description;
  let capitalizedDescription =
    description.charAt(0).toUpperCase() + description.slice(1);
  descriptionElement.innerHTML = capitalizedDescription;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiKey = "of26b55307144beab6f326a4tefcaa5e";
  let apiURl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURl).then(displayForecast);
}

function phraseUpdate(event) {
  event.preventDefault();
  let phraseElement = document.querySelector("#new-phrase");
  phraseElement.textContent = ". Dress it like you mean it!";
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "of26b55307144beab6f326a4tefcaa5e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayNewInfo);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
searchForm.addEventListener("submit", phraseUpdate);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

searchCity("Madrid");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML += `<div class="forecast-day">
          <div class="text-small">${formatDay(day.time)}</div>
          <img class="forecast-icon"src="${day.condition.icon_url}" />
          <div class="forecast-temp"><strong>${Math.round(
            day.temperature.maximum
          )}º</strong> &nbsp; ${Math.round(day.temperature.minimum)}º</div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

function displayCurrentTemp(response) {
  let firstDay = response.data.daily[0];

  document.querySelector("#current-max").innerHTML = Math.round(
    firstDay.temperature.maximum
  );
  document.querySelector("#current-min").innerHTML = Math.round(
    firstDay.temperature.minimum
  );
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

  updateColorsByTemperature(response.data.temperature.current);
  getForecast(response.data.city);
}
function updateColorsByTemperature(temp) {
  const body = document.body;
  body.classList.remove("warm-theme", "cool-theme");

  if (temp > 25) {
    body.classList.add("warm-theme");
  } else if (temp < 15) {
    body.classList.add("cool-theme");
  }
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
  axios(apiURl).then(displayCurrentTemp);
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

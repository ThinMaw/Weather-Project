function refreshWeather(response) {
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");
  let temp = Math.round(response.data.temperature.current);
  let humElement = document.querySelector("#hum");
  let windElement = document.querySelector("#wind");
  let forcastElement = document.querySelector("#forcast");
  let iconElement = document.querySelector("#icon");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = temp;
  humElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  forcastElement.innerHTML = response.data.condition.description;
  iconElement.innerHTML = `<img src = "${response.data.condition.icon_url}" class="weather-app-icon" />`;
  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function cityUrl(city) {
  let apiKey = "61f4f92abtf2d414oe889522f6b3804a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function shCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#enter-search-place");
  cityUrl(searchCity.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "61f4f92abtf2d414oe889522f6b3804a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", shCity);

cityUrl("Bangkok");

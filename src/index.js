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
  console.log(response);
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

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", shCity);

cityUrl("Yangon");

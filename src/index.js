function formatDate(timestamp) {
  let currentDate = new Date();

  let h2 = document.querySelector("#current-date-time");

  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  let day = days[currentDate.getDay()];

  let date = currentDate.getDate();
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getHours();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  h2.innerHTML = `${day}, ${date} ${hours}:${minutes}`;
}

formatDate();

function getCurrentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#city-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector(
    "#current-humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#current-windspeed"
  ).innerHTML = `Windspeed: ${Math.round(response.data.wind.speed)}km/h`;}

function searchCity(city) {
  let apiKey = `a6280162e920de8e2e14118aadbf3eac`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Denver");
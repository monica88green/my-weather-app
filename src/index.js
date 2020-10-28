function displayDate() {
  let currentDate = new Date();

  let h2 = document.querySelector("h2");

  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  let day = days[currentDate.getDay()];

  let date = currentDate.getDate();
  let hours = currentDate.getHours();
  let minutes = currentDate.getHours();

  h2.innerHTML = `${day}, ${date} ${hours}:${minutes}`;
}

displayDate();

function getCurrentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#city-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector(
    "#current-humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#current-windspeed"
  ).innerHTML = `Windspeed: ${Math.round(response.data.wind.speed)}`;
}

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
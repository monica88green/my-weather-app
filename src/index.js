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

  h2.innerHTML = `${day}, ${date} ${hours}:${minutes}`
}
formatDate();


function getCurrentWeather(response) {
  celsiusTemp = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#city-temp").innerHTML = `${Math.round(
    celsiusTemp
  )}`;
  document.querySelector("#weather-icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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

function getFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#city-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemp = (celsiusTemp * 9)/5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  
}

function getCelsiusTemp(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  

  let temperatureElement = document.querySelector("#city-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", getFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", getCelsiusTemp);

searchCity("Denver");
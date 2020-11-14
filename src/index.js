function formatDate(timestamp) {
  let date= new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`
;}
 


function getCurrentWeather(response) {
  celsiusTemp = response.data.main.temp;

  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#city-temp");
  let iconElement = document.querySelector("#weather-icon");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-windspeed");
  let dateElement = document.querySelector("#current-date-time");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${Math.round(celsiusTemp)}`;
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windElement.innerHTML = `Windspeed: ${Math.round(response.data.wind.speed)}km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);


}


function getForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
  forecast = response.data.list[index];
  forecastElement.innerHTML += `
        <div class="col-2">
          <div><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"<div>
          <div class="hourly-temp" id="hourly-forecast">
            <strong>${Math.round(forecast.main.temp_max)}°</strong>${Math.round(forecast.main.temp_min)}°
          </div>
        </div>`;

}}

function searchCity(city) {
  let apiKey = `a6280162e920de8e2e14118aadbf3eac`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getCurrentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getForecast);
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
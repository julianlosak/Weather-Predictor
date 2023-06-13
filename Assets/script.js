const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const searchHistory = document.getElementById('searchHistory');
const currentWeather = document.getElementById('currentWeather');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const city = cityInput.value;
  
  if (city.trim() !== '') {
    getWeather(city);
    cityInput.value = '';
  }
});

function getWeather(city) {
    const apiKey = '1b808dbe6e49e6e5a020262fdc6e45d4';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayCurrentWeather(data);
        addCityToSearchHistory(city);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  function displayCurrentWeather(weatherData) {
    const current = weatherData.weather[0];
    const temperature = Math.round(weatherData.main.temp - 273.15);
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
  
    currentWeather.innerHTML = `
      <div class="weather-card">
        <h2>${current.description}</h2>
        <img src="http://openweathermap.org/img/wn/${current.icon}.png" alt="${current.description}">
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      </div>
    `;
  }
  
function addCityToSearchHistory(city) {
  const searchEntry = document.createElement('p');
  searchEntry.textContent = city;
  
  searchEntry.addEventListener('click', function() {
    getWeather(city);
  });
  
  searchHistory.appendChild(searchEntry);
}

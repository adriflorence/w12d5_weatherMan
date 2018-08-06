const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.onreadystatechange = function () { // when state changes
    if(request.readyState === 4 && request.status === 200) { // 4: operation complete (returned)
      callback(JSON.parse(request.responseText));
    }
  }
  request.send();
};

const fetchWeatherData = function (response) {
  const woeid = response[0].woeid; // where on earth ID
  makeRequest(`https://www.metaweather.com/api/location/${woeid}`, (response) => {
    // console.log(response);
    const event = new CustomEvent('locationFound', {
      detail: {
        coordinates: response.latt_long.split(','),
        city: response.title,
        abbreviation: response.consolidated_weather[0].weather_state_abbr,
        weather: response.consolidated_weather[0].weather_state_name,
        temp: response.consolidated_weather[0].the_temp
      }
    });
    window.dispatchEvent(event);
  })
}

const displayWeatherInfo = function (weather) {
  let displayArea = document.getElementById('weather-details');
  displayArea.innerHTML = '';
  let cityName = document.createElement('h2');
  let weatherText = document.createElement('p');
  let weatherImage = document.createElement('img');
  cityName.innerText = `${weather.city}: `;
  weatherText.innerText = `${weather.weather} , temperature: ${weather.temp.toFixed(1)} °C`;
  weatherImage.src = `https://www.metaweather.com/static/img/weather/${weather.abbreviation}.svg`
  displayArea.appendChild(cityName);
  displayArea.appendChild(weatherText);
  displayArea.appendChild(weatherImage);
}

var app = function(){
  const mapWrapper = new MapWrapper("map", 51.5074, 0.1278, 10);
  window.addEventListener('locationFound', function(e) {
    mapWrapper.addMarker(e.detail.coordinates, e.detail.abbreviation);
    mapWrapper.moveTo(e.detail.coordinates);
    console.log(e);
    displayWeatherInfo(e.detail);
  })
};

const searchOnSubmit = function(event) {
  event.preventDefault(); // prevents page from reloading upon submit
  const cityName = document.getElementById('location-search').value;
  if(!cityName) throw new Error('Empty city name');
  const weatherurl = `https://www.metaweather.com/api/location/search/?query=${cityName}`;
  makeRequest(weatherurl, fetchWeatherData);
}

window.addEventListener('load', app);

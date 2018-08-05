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
        abbreviation: response.consolidated_weather[0].weather_state_abbr
      }
    });
    window.dispatchEvent(event);
  })
}

var app = function(){
  const mapWrapper = new MapWrapper("map", 51.5074, 0.1278, 10);
  window.addEventListener('locationFound', function(e) {
    mapWrapper.addMarker(e.detail.coordinates, e.detail.abbreviation);
    mapWrapper.moveTo(e.detail.coordinates);
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

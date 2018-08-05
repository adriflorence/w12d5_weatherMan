const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

const requestComplete = function () {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const weatherStuff = JSON.parse(jsonString);
  console.log(weatherStuff);
  displayWeather(weatherStuff);
};

const displayWeather = function (weatherStuff) {
  weatherStuff.consolidated_weather.forEach(function(location) {

    console.log(location);
  })
};

var app = function(){
  const mapWrapper = new MapWrapper("map", 51.5074, 0.1278, 10);

  mapWrapper.map.on('load', function (event) {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    console.log(lat);
    const weatherurl = `https://www.metaweather.com/api/location/search/?lattlong=${lat},${lng}`;
    makeRequest(weatherurl, requestComplete);
  });
};

window.addEventListener('load', app);

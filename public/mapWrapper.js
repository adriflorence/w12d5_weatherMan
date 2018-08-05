const MapWrapper = function(element, lat, lng, zoom){
  const osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osm = new L.TileLayer(osmUrl);
  this.map = L.map(element).addLayer(osm).setView([lat, lng], zoom);
};

const weatherIconProvider = function (abbreviation) {
  return L.icon( {iconUrl:`https://www.metaweather.com/static/img/weather/${abbreviation}.svg`,  iconSize: [50, 100]});
}

MapWrapper.prototype.addMarker = function (coords, abbreviation) {
  L.marker(coords, { icon: weatherIconProvider(abbreviation) }).addTo(this.map);
};

MapWrapper.prototype.moveTo = function (coords) {
  console.log('COORDS', coords);
  this.map.panTo(coords, 6);
};

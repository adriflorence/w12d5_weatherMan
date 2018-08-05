const MapWrapper = function(element, lat, lng, zoom){
  const osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osm = new L.TileLayer(osmUrl);

  this.map = L.map(element).addLayer(osm).setView([lat, lng], zoom);
  this.map.on("click", this.handleMapClick.bind(this));
};

MapWrapper.prototype.handleMapClick = function (event) {
  // debugger;
  this.addMarker(event.latlng.lat, event.latlng.lng);
};

MapWrapper.prototype.addMarker = function(lat, lng, text){
  L.marker([lat, lng]).bindPopup(text).addTo(this.map);
};

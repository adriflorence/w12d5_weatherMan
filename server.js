const express = require('express');
const app = express(); // constructor call
const path = require('path')
const fetch = require('node-fetch');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/nearby', (request, response) => {
  const lat = request.query.lat;
  const lon = request.query.lon;
  fetch(`https://www.metaweather.com/api/location/search/?lattlong=${lat},${lon}`)
  .then(response => response.json())
  .then(response => console.log(response));
});

app.use(express.static('public'));

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

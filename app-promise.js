const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options ({
  a : {
    demand : true,
    alias: 'address',
    descrption: 'Address to fetch weather for',
    string : true
  }
})
.help()
.alias('help','h')
.argv;

let codeURL = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${codeURL}&key=AIzaSyATwqjYH4aK1MYazdGkYGxiyB8R6RIZess`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find the Address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/1a122e819377fecbfffb48a6600eabe1/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temp = (response.data.currently.temperature - 32 ) / 1.8;
  var apparentTemperature = (response.data.currently.apparentTemperature - 32) / 1.8;
  console.log(`It's currently ${temp}. It feels like ${apparentTemperature}.`);
})
.catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to the API server');
  } else {
    console.log(e.message);
  }
});

const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather');

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

var code = geocode.geocodeAddress(argv.a, (errorMessage, result) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(result.address);
    weather.getWeather(result.latitude, result.longitude, (errorMessage, weatherResult) => {
      if(errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResult.temperature}. It feels like ${weatherResult.apparentTemperature}.`);
      }
    });
  }
});

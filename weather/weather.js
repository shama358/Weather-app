const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url : `https://api.darksky.net/forecast/1a122e819377fecbfffb48a6600eabe1/${lat},${lng}`,
    json : true
  }, function(error, response, body) {
    if (error) {
      callback('Unable to connect to forecast.io server');
    } else if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature : body.currently.temperature,
        apparentTemperature : body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather');
    }
  });
};

module.exports.getWeather = getWeather;

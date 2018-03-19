const request = require('request');

var geocodeAddress = (address, callback) => {
  let codeURL = encodeURIComponent(address);
  request({
    url : `https://maps.googleapis.com/maps/api/geocode/json?address=${codeURL}&key=AIzaSyATwqjYH4aK1MYazdGkYGxiyB8R6RIZess`,
    json : true
  }, function(error, response, body) {
    if (error) {
      callback("Unable to connect to the google server");
    }else if (body.status === 'ZERO_RESULTS') {
      callback("unable to find that address");
    } else if (body.status === 'OK') {
      callback(undefined, {
        address : body.results[0].formatted_address,
        latitude : body.results[0].geometry.location.lat,
        longitude : body.results[0].geometry.location.lng,
      });
    }
  });
}

module.exports. geocodeAddress = geocodeAddress;

const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    let codeURL = encodeURIComponent(address);
    console.log(codeURL);
    request({
      url : `https://maps.googleapis.com/maps/api/geocode/json?address=${codeURL}&key=AIzaSyATwqjYH4aK1MYazdGkYGxiyB8R6RIZess`,
      json : true
    }, function(error, response, body) {
      if (error) {
        reject("Unable to connect to the google server");
      }else if (body.status === 'ZERO_RESULTS') {
        reject("unable to find that address");
      } else if (body.status === 'OK') {
        resolve({
          address : body.results[0].formatted_address,
          latitude : body.results[0].geometry.location.lat,
          longitude : body.results[0].geometry.location.lng,
        });
      }
    });
  });
};

geocodeAddress('000000').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});

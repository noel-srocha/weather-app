const request = require('postman-request');

const geocode = (address, callback) => {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2Fydm9uYXQiLCJhIjoiY2t4eWt6ZTQ2YWN5eTJ2cTNlbGpxc3JhZiJ9.kFR3IdAKpTAZ2tOABieNQQ`;

  request({ url: geoUrl, json: true }, (error, response) => {
    try {
      if (response.body.features.length === 0) callback('Location parameters invalid!');
      else {
        callback(undefined, {
          longitude: response.body.features[0].center[0],
          latitude: response.body.features[0].center[1],
          place: response.body.features[0].place_name,
        });
      }
    } catch {
      callback('Unable to connect to geographic search service!', undefined);
    }
  });
};

module.exports = geocode;

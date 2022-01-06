const request = require('postman-request');

const forecast = (latitude, longitude, callback, units = 'm') => {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=49ddb34ec337315f238e0d5006371ef5&query=${latitude},${longitude}&units=${units}`;

  request({ url: weatherUrl, json: true }, (error, response) => {
    const data = response.body.current;
    try {
      if (response.body.error) {
        callback('Specified coordinates are invalid!', undefined);
      } else {
        callback(undefined, {
          weather: data.weather_descriptions,
          windData: [data.wind_speed, data.wind_dir],
          temperatures: [data.temperature, data.feelslike],
          humidity: data.humidity,
          uvIndex: data.uv_index,
        });
      }
    } catch {
      callback('Unable to connect to weather service!', undefined);
    }
  });
};

module.exports = forecast;

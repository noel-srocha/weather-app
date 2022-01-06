console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherResult = document.querySelector('#weather-result');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const location = search.value;

  weatherResult.textContent = 'Loading...';

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((weatherData) => {
      if (weatherData.error) weatherResult.textContent = weatherData.error;
      else {
        weatherResult.textContent = `It's ${weatherData.forecast.weather[0]} at ${weatherData.location}!
        Current Temperature: ${weatherData.forecast.temperatures[0]} degrees Celsius`;
      }
    });
  });
});

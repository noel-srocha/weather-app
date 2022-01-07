const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const ERROR_NOT_FOUND = 404;
const RESPONSE_SUCCESS = 200;
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Manoel de Souza Rocha Neto',
  });
});

app.get('/about', (req, res) => {
  res.status(RESPONSE_SUCCESS).render('about', {
    title: 'What is this app about?',
    description: 'This site was created by Manoel de Souza Rocha Neto as part of Andrew ead\'s Complete Node.js Developer Course assignment. It uses data from MapBox\'s and Weather Stack\'s respective APIs to get weather data from the location input.',
    name: 'Manoel de Souza Rocha Neto',
  });
});

app.get('/help', (req, res) => {
  res.status(RESPONSE_SUCCESS).render('help', {
    title: 'FAQ',
    description: 'These are the most commonly asked questions about this app...',
    name: 'Manoel de Souza Rocha Neto',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Please enter a valid address...' });
  }

  return geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
    if (error) return res.send({ error });

    return forecast(latitude, longitude, (err, forecastData) => {
      if (err) return res.send({ err });

      return res.status(RESPONSE_SUCCESS).send({
        forecast: forecastData,
        location: place,
        address: req.query.address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.status(ERROR_NOT_FOUND).render('not_found', {
    title: 'Error 404',
    name: 'Manoel de Souza Rocha Neto',
    description: 'Article not found...',
  });
});

app.get('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).render('not_found', {
    title: 'Error 404',
    name: 'Manoel de Souza Rocha Neto',
    description: 'Page not found...',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

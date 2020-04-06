const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Christopher'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Christopher'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		message: 'this is the help section.',
		name: 'Christopher'
	});
});

app.get('/weather', (req, res) => {
	const { address } = req.query;

	if (!address) {
		return res.send({
			error: 'You must provide an address'
		});
	}
	geoCode(address, (error, { location, latitude, longitude } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Christopher',
		errorMessage: 'Help article not found'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Christopher',
		errorMessage: 'Page not found'
	});
});

app.listen(3000, () => {
	console.log('server is running on port 3000');
});

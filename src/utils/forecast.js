const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const query = 'units=si';
	const lang = 'lang=en';

	const url = `https://api.darksky.net/forecast/28ca81e50aeba1e8e6d7ba9f55e590b9/${latitude},${longitude}?${query}&${lang}`;

	request({ url, json: true }, (error, { body }) => {
		const { currently, daily, error: error2 } = body;
		if (error) {
			callback('unable to connect to weather services', undefined);
		} else if (error2) {
			callback('unable to find location', undefined);
		} else {
			const data = currently;
			const temperature = data.temperature;
			const precipProbability = data.precipProbability;
			const dailyData = daily;
			const dailySummary = dailyData.data[0].summary;

			callback(
				undefined,
				`${dailySummary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`
			);
		}
	});
};

module.exports = forecast;

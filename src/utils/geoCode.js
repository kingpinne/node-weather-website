const request = require('request');

const geoCode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiY2hyaXN0b3BoZXItZGFobGdyZW4iLCJhIjoiY2s3ZnZlYnVwMDZoZTNlbXBnYjRoMHRheiJ9.AM2AViSe7YINwzGxrFii1w&limit=1`;

	request({ url: url, json: true }, (error, { body }) => {
		const { features } = body;

		if (error) {
			callback('Unable to connect to location services', undefined);
		} else if (features.length === 0) {
			callback('Unable to find location, try another search', undefined);
		} else {
			callback(undefined, {
				latitude: features[0].center[1],
				longitude: features[0].center[0],
				location: features[0].place_name
			});
		}
	});
};

module.exports = geoCode;

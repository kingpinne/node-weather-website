// fetch('http://localhost:3000/weather?address=boston').then(response => {
// 	if (response.error) {
// 		return console.log(error);
// 	}
// 	response.json().then(data => {
// 		console.log('Location: ' + data.location);
// 		console.log('Forecast: ' + data.forecast);
// 	});
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', e => {
	e.preventDefault();
	//clear the p-tags
	document.getElementById('location').innerHTML = 'Loading...';
	document.getElementById('forecast').innerHTML = '';

	const address = search.value;
	document.getElementById('address').value = '';
	fetch(`http://localhost:3000/weather?address=${address}`).then(response => {
		response.json().then(data => {
			if (data.error) {
				return (document.getElementById('location').innerHTML = data.error);
			}
			document.getElementById('location').innerHTML = data.location;
			document.getElementById('forecast').innerHTML = data.forecast;
		});
	});
});

const https = require('https');
const express = require('express');

const app = express();

const apiOptions = {
	method: 'GET',
	hostname: 'exercisedb.p.rapidapi.com',
	port: null,
	headers: {
		'X-RapidAPI-Key': '434926303fmsh2523c526b9d8f8ep1f9b80jsncf2477d48f66',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};

function fetchExercises(bodyPart, callback) {
	const path = `/exercises/bodyPart/${bodyPart}?limit=2`;
	const options = { ...apiOptions, path };

	const apiRequest = https.request(options, (apiResponse) => {
		let chunks = '';

		apiResponse.on('data', (chunk) => {
			chunks += chunk;
		});

		apiResponse.on('end', () => {
			try {
				const body = JSON.parse(chunks);
				callback(null, body);
			} catch (error) {
				callback(error, null);
			}
		});
	});

	apiRequest.end();
}

app.get('/', (req, res) => {
	fetchExercises('all', (error, body) => {
		if (error) {
			res.status(500).json({ error: 'Error fetching exercises' });
		} else {
			res.json(body);
		}
	});
});

app.get('/:bodyPart', (req, res) => {
	const bodyPart = req.params.bodyPart.toLowerCase();

	fetchExercises(bodyPart, (error, body) => {
		if (error) {
			res.status(500).json({ error: 'Error fetching exercises' });
		} else {
			res.json(body);
		}
	});
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

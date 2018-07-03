const Clarifai = require('clarifai');

//Use Clarifai api key to make image request
const app = new Clarifai.App({
  apiKey: 'e8ec81ca90f944e6b44473275ebf7c12'
});

const handleAPICall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to reach api'))
}

const handleImage = (req,res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleAPICall
};
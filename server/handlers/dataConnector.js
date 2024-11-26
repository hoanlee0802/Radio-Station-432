const mongoose = require('mongoose');

const connect = () => {
	const opt = {
		dbName: 'RadioApp'
	}

	console.log("starting to connect to mongo...");
	mongoose.connect(process.env.MONGO_URL, opt);

	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error: '));
	db.once('open', () => {
		console.log("\t Connected to Mongo Successfully!");
	})
}

module.exports = {
	connect
}
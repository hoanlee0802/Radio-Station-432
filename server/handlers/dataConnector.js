const mongoose = require('mongoose');

let demoMode = true;
const connect = () => {
	const opt = {
		dbName: 'RadioApp'
	}

	console.log("starting to connect to mongo...");

	mongoose.set('bufferCommands', !demoMode); // disables buffering for demo mode (not recommended for production), allowing the catch block to be hit immediately
	
	mongoose.connect(process.env.MONGO_URL, opt)
	.then(() => {
		console.log('\tConnected to Mongo.');
		demoMode = false; // disable demo mode after successful connection
	})
	.catch(err => {
		console.error("\nMongoDB connection failed - \n\t**check that the .env file has the correct connection string and password within it for MONGO_URL.\n\n", err.message);
		console.log("\n\t>> Demo the application (routing and UI) on localhost, even without a database connection.");
	});

	const db = mongoose.connection;
	db.on('error', () => {
		console.error.bind(console, 'connection error: ');
	});
	db.once('open', () => {
		console.log("\t Connected to Mongo Successfully!");
	});
}

const isConnected = () => mongoose.connection.readyState !== 0; // check that the database is not disconnected (0), otherwise it is connected (1), connecting (2), or disconnecting (3)
const isDemoMode = () => demoMode;

module.exports = {
	connect,
	isConnected,
	isDemoMode
}
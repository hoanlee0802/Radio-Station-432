const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
	_id: Number, // _id is included only here because we set a custom ID string rather than using the default MongoDB generated _id
	name: String,
	artist: String
})

// the last parameter refers to database collection of songLibrary
module.exports = mongoose.model('Song', songSchema, 'songLibrary');
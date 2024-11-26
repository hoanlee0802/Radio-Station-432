const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
	_id: Number,
	name: String,
	artist: String
})

// the last parameter refers to database collection of songLibrary
module.exports = mongoose.model('Song', songSchema, 'songLibrary');
const mongoose = require('mongoose');
const { Song } = require(__dirname + '/Song.js');

const userSchema = new mongoose.Schema({
	// The Object _id should not be included in the Schema but can be implicitly referenced with ["_id"] in EJS without attribute quotes
	name: String,
	currPlaylist: String,
	playlists: {
		names: [{ type: String }], // Array of Strings
		data: {
			//* Example of how the data will look (will contain an indefinite amount of playlists):
			// "playlistName": [
			// 		{id: 1, name: 'mySong1'},
			// 		{id: 2, name: 'mySong2'}
			// ]
		}
	}
})

// the last parameter refers to database collection of users
module.exports = mongoose.model('User', userSchema, 'users');
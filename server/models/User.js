const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	id: Number,
	name: String,
	currPlaylist: String,
	playlists: {
		names: Array,
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
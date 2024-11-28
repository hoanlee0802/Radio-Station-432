const mongoose = require("mongoose");

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
    },
  },
  schedule: [
    {
      dayOfWeek: { type: String, required: true }, // e.g., Monday, Tuesday
      timeSlot: { type: String, required: true }, // e.g., 8:00 AM - 10:00 AM
    },
  ],
});

// the last parameter refers to database collection of users
module.exports = mongoose.model("User", userSchema, "users");

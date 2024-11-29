
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = 5500;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect("mongodb+srv://lucavasilach:LucaAnthonyHoan@lab14.njkx5.mongodb.net/", {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

// // Playlist Schema
// const playlistSchema = new mongoose.Schema({
//     playlistName: String,
//     timeSlot: String,
//     songs: [
//         {
//             icon: String,
//             title: String,
//             artist: String
//         }
//     ]
// });

// const Playlist = mongoose.model('Playlist', playlistSchema);

// // Route to add a playlist
// app.post('/submitPlaylist', (req, res) => {
//     const { playlistName, timeSlot } = req.body;
//     const newPlaylist = new Playlist({
//         playlistName,
//         timeSlot,
//         songs: [] // Add any songs if available, or leave empty for now
//     });

//     newPlaylist.save()
//         .then(result => res.status(201).json(result))
//         .catch(error => res.status(500).json({ error: error.message }));
// });

// // Route to get playlists
// app.get('/playlists', (req, res) => {
//     Playlist.find({})
//         .then(playlists => res.json(playlists))
//         .catch(error => res.status(500).json({ error: error.message }));
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

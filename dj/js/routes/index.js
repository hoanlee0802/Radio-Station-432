const express = require('express');
const router = express.Router();

// Mock data for a playlist
const playlist = [
    { title: 'Song 1', artist: 'Artist 1' },
    { title: 'Song 2', artist: 'Artist 2' },
    { title: 'Song 3', artist: 'Artist 3' }
];

// Home route
router.get('/', (req, res) => {
    res.render('pages/index', { title: 'Home', playlist });
});

module.exports = router;
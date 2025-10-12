const express = require('express');
const path = require('path');

const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
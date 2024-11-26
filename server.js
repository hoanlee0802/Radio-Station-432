require('dotenv').config();

var express = require('express');
var app = express();

// Global Static Files currently in same directory as server file:
app.use(express.static(__dirname));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Each Role Static Files:
app.use('/producer', express.static(__dirname + '/producer'));
// app.use(...);
// app.use(...);



// Each Role Views
app.set('views', [
	__dirname + '/producer/views'
	// ...
	// ...
]);

// res.render loads up an ejs view file

app.set('/', function(req, res) {
	res.render(/* Our group 10 EJS file when it exists */);
});

const Song = require('./server/models/Song')
// tell node to use json and HTTP header features in body-parser
app.use(express.urlencoded({ extended: true }));

const songRouter = require('./server/handlers/songLibraryRouter.js')

// index page
app.get('/producer', async function(req, res) {
	
	res.render('pages/index', {
		songs: songRouter.handleAllSongs(app, Song), //  does not work possible asynchronous issues
		songs: [{ id: 1, name: "Test EJS forEach", artist: "It works" }] // overwritten to check forEach works
	});
});

// create a connection to database
require('./server/handlers/dataConnector.js').connect();

app.use(function (req, res, next) {
	res.status(404).send("<h2>Page not found (404)</h2>"); // when a resource is not found, send this to web page
})

const port = process.env.PORT;
app.listen(port);
console.log('\nServer is listening on port= ' + port);
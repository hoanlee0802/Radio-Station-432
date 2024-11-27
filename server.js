require('dotenv').config();

const bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.json());

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

// tell node to use json and HTTP header features in body-parser
app.use(express.urlencoded({ extended: true }));

const Song = require('./server/models/Song');
const User = require('./server/models/User');

const songHandler = require('./server/handlers/songLibraryHandler.js');
const userHandler = require('./server/handlers/userHandler.js');

//**  ROUTES:  **//


//* Manager Routes
//...



//* Producer Routes
// landing page with selectDJ option
app.get('/producer', function (req, res) {
	const prom1 = userHandler.handleAllUsers(app, User, req.params.userID); // Promise gets data for single user
	const prom2 = songHandler.handleAllSongs(app, Song); // Promise loads the left panel Song Library database

	Promise.all([prom1, prom2]).then(arrayOfResolves => {
		[users, songLibrary] = arrayOfResolves; // array destructuring creates variables containing each request result
		const allUsers = JSON.parse(users);
		const songLib = JSON.parse(songLibrary);

		res.render('pages/index', {
			users: allUsers, // renders the playlists in dropdown (potentially subject to change)
			songs: songLib,
			playlists: [], //placeholder empty value will be updated later
			overlay: true
		});
	});
});

function djRender(req, res, showOverlay) {
	const prom1 = userHandler.handleAllUsers(app, User, req.params.userID); // Promise gets data for single user
	const prom2 = songHandler.handleAllSongs(app, Song); // Promise loads the left panel Song Library database

	Promise.all([prom1, prom2]).then(arrayOfResolves => {
		[users, songLibrary] = arrayOfResolves; // array destructuring creates variables containing each request result
		const allUsers = JSON.parse(users);
		const songLib = JSON.parse(songLibrary);

		res.render('pages/index', {
			users: allUsers, // renders the playlists in dropdown (potentially subject to change)
			songs: songLib,
			playlists: [], //placeholder empty value will be updated later
			overlay: showOverlay
		});
	});
}

app.get('/producer', function (req, res) {
	const prom1 = userHandler.handleAllUsers(app, User, req.params.userID); // Promise gets data for single user
	const prom2 = songHandler.handleAllSongs(app, Song); // Promise loads the left panel Song Library database

	Promise.all([prom1, prom2]).then(arrayOfResolves => {
		[users, songLibrary] = arrayOfResolves; // array destructuring creates variables containing each request result
		const allUsers = JSON.parse(users);
		const songLib = JSON.parse(songLibrary);

		res.render('pages/index', {
			users: allUsers, // renders the playlists in dropdown (potentially subject to change)
			songs: songLib,
			playlists: [], //placeholder empty value will be updated later
			overlay: true
		});
	});
	// const prom = userHandler.handleSingleUser(app, User, req.params.userID); // Promise gets data for single user

})


app.get('/producer/:userID', function(req, res) {
	const prom1 = userHandler.handleAllUsers(app, User, req.params.userID); // Promise gets data for single user
	const prom2 = songHandler.handleAllSongs(app, Song); // Promise loads the left panel Song Library database
	// const prom = userHandler.handleSingleUser(app, User, req.params.userID); // Promise gets data for single user

	Promise.all([prom1, prom2]).then(arrayOfResolves => {
		[users, songLibrary] = arrayOfResolves; // array destructuring creates variables containing each request result
		const allUsers = JSON.parse(users);
		const songLib = JSON.parse(songLibrary);

		res.render('pages/index', {
			users: allUsers, // renders the playlists in dropdown (potentially subject to change)
			songs: songLib,
			playlists: [], //placeholder empty value will be updated later
			overlay: false
		});
	});
	
	
	console.log(req.params.userID);
})


const ProducerHandler = require('./server/handlers/ProducerHandler.js');


app.route('/producer/:userID').post((req, res) => {
	console.log(req.body.pListName, req.body.newData);
	ProducerHandler.updateCurrPlaylist(req.params.userID, req.body.pListName, req.body.newData)
		.then(() => {
			console.log("POST fetch request");
			
			res.status(200).send("Playlist updated successfully");
		})
		.catch(err => {
			console.error(err);
			res.status(500).send("Error updating playlist");
		});
	djRender(req, res, false);
});


//* DJ Routes
//...



//* create a connection to database
require('./server/handlers/dataConnector.js').connect();

app.use(function (req, res, next) {
	res.status(404).send("<h2>Page not found (404)</h2>"); // when a resource is not found, send this to web page
})

const port = process.env.PORT;
app.listen(port);
console.log('\nServer is listening on port= ' + port);
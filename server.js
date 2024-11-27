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
// Renders data for the 
function renderProd(req, res, showOverlay) {
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

// landing page with selectDJ option
app.get('/producer', function (req, res) {
	renderProd(req, res, true); // true shows DJ selection overlay
});


// Express needs to know that this is a valid path (we only care about the userID when we get a POST request from the client side i.e. from fetch())
app.get('/producer/:userID', function(req, res) {
	// if this handler does not render anything, Express will keep our initial render from '/producer'
	renderProd(req, res, false); // but need to include this render other wise the User ID won't be maintained in the URL
	
	console.log(req.params.userID); // we can perform more actions here if desired, but for know we just log the userID
})


const ProducerHandler = require('./server/handlers/ProducerHandler.js');

// handles post requests when there is a valid user ID in the URL
app.route('/producer/:userID').post((req, res) => {
	// console.log(req.body.pListName, req.body.newData); req.body contains data sent from fetch request in playlist-data.js
	ProducerHandler.updateCurrPlaylist(req.params.userID, req.body.pListName, req.body.newData)
		.then(() => {
			// console.log("POST fetch received");
			renderProd(req, res, false);
		})
		.catch(err => {
			console.error(err);
			res.status(500).send("Error updating playlist");
		});
	
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
require('dotenv').config();

const bodyParser = require('body-parser');
var express = require('express');
var app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('express-session'); // enable session cookies
// configure session middleware
app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: false,
	resave: false,
	cookie: { secure: false, httpOnly: true, secure: process.env.NODE_ENV === 'production' } // session state across routes only works in production mode
}));

app.use(bodyParser.json());

// Global Static Files currently in same directory as server file:
app.use(express.static(__dirname));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Each Role Static Files:
app.use('/', express.static(__dirname)); // static files for the home page at top directory
app.use('/producer', express.static(__dirname + '/producer'));
// app.use(...);
// app.use(...);



// Each Role Views
app.set('views', [
	__dirname + '/views', // view for the home page
	__dirname + '/producer/views'
	// ...
	// ...
]);

// res.render loads up an ejs view file

app.get('/', function(req, res) {
	res.render('pages/group10');
});

// tell node to use json and HTTP header features in body-parser
app.use(express.urlencoded({ extended: true }));

const Song = require('./server/models/Song.js');
const User = require('./server/models/User.js');

const songHandler = require('./server/handlers/songLibraryHandler.js');
const userHandler = require('./server/handlers/userHandler.js');

//**  ROUTES:  **//


//* Manager Routes
//...



//* Producer Routes
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
	// console.log(req.session.viewingDJ);

	// the following will only redirect if the user has not logged out of the session, otherwise session.viewingDJid will be undefined:
	// if (req.session.viewingDJ) // the cookie will only exist if the user opened a DJ view and hasn't logged out
	// 	res.redirect(`/producer/${req.session.viewingDJ}`); // take the user back to their last viewing DJ instead of the select DJ landing page

	if (req.cookies.viewingDJ) // the cookie will only exist if the user opened a DJ view and hasn't logged out
		res.redirect(`/producer/${req.cookies.viewingDJ}`); // take the user back to their last viewing DJ instead of the select DJ landing page
	else
		renderProd(req, res, true); // true shows DJ selection overlay
	
});


app.get('/producer/logout', function (req, res) {
	res.clearCookie('viewingDJ'); // remove cookie of last viewed DJ's ID
	res.redirect('/'); // now take the user to the home page
})



// Express needs to know that this is a valid path (we only care about the userID when we get a POST request from the client side i.e. from fetch())
app.get('/producer/:userID', function(req, res) {
	// if this handler does not render anything, Express will keep our initial render from '/producer'

	// req.session.viewingDJ = req.params.userID; // store the cookie with the last viewed DJ ID to load the next time '/producer' view is opened
	res.cookie('viewingDJ', req.params.userID); // store the cookie with the last viewed DJ ID to load the next time '/producer' view is opened
	// console.log(req.session.viewingDJ);

	
	renderProd(req, res, false); // but need to include this render other wise the User ID won't be maintained in the URL

	
	
	// console.log(req.params.userID); // we can perform more actions here if desired, but for now we just log the userID
})

const ProducerHandler = require('./server/handlers/ProducerHandler.js');

function handleFetchRequest(req, res, action, funcName) {
	console.log(`Handling ${action} request for function ${funcName}`);
	console.log("Request params:", req.params);
	console.log("Request body:", req.body);
	ProducerHandler[funcName](req.params.userID, req.body.pListName, req.body.newData)
		.then((data) => {
			console.log(`${action} fetch received`);
			if (action == 'GET') {
				console.log("Sending data:", data);
				res.status(200).json(data);
			} else {
				res.status(200).send('Received fetch request');
			}
		})
		.catch(err => {
			console.error(err);
			res.status(500).send(`${action} Error`);
		});
}

// handles server requests when there is a valid user ID in the URL, and a client-side fetch request is made
app.route('/producer/:userID').put((req, res) => {
	handleFetchRequest(req, res, 'update PUT', 'updateCurrPlaylist');

}).post((req, res) => {
	handleFetchRequest(req, res, 'create POST', 'createPlaylist')

}).delete((req, res) => {
	handleFetchRequest(req, res, 'DELETE', 'deletePlaylist')

}).get((req, res) => {
	handleFetchRequest(req, res, 'GET', 'getPlaylists'); // GET should only be needed once on page load

})


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
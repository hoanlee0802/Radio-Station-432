const { isConnected, isDemoMode } = require('./server/handlers/dataConnector.js');

module.exports = function(app) {

	const Song = require('./server/models/Song.js');
	const User = require('./server/models/User.js');

	const songHandler = require("./server/handlers/songLibraryHandler.js");
	const userHandler = require("./server/handlers/userHandler.js");

	
	function renderProd(req, res, showOverlay, loadUser) {
		const prom1 = userHandler.handleAllUsers(app, User, req.params.userID); // Promise gets data for single user
		const prom2 = songHandler.handleAllSongs(app, Song); // Promise loads the left panel Song Library database

		Promise.all([prom1, prom2]).then((arrayOfResolves) => {
			[users, songLibrary] = arrayOfResolves; // array destructuring creates variables containing each request result
			const allUsers = JSON.parse(users);
			const songLib = JSON.parse(songLibrary);

			res.render("pages/index", {
				users: allUsers, // renders the playlists in dropdown (potentially subject to change)
				songs: songLib,
				playlists: [], //placeholder empty value will be updated later
				overlay: showOverlay,
				dbConnected: isConnected(),
				isDemoMode: isDemoMode(),

				userData: loadUser ? loadUser : {} // object will be placed in EJS page in <script> to be referenced by client (easier than fetch etc.)
			});
		});
	}


	// landing page with selectDJ option
	app.get('/producer', function (req, res) {
		if (req.cookies.viewingDJ) // the cookie will only exist if the user opened a DJ view and hasn't logged out
			res.redirect(`/producer/${req.cookies.viewingDJ}`); // take user back to their last viewed DJ instead of select DJ landing page
		else
			renderProd(req, res, isConnected()); // the DJ selection overlay will be default shown if the database server is connected

	});


	app.get('/producer/logout', function (req, res) {
		res.clearCookie('viewingDJ'); // remove cookie of last viewed DJ's ID
		res.redirect('/'); // now take the user to the home page
	})


	// Express needs to know that this is a valid path (we only care about the userID when we get a POST request from the client side i.e. from fetch())
	app.get('/producer/:userID', function (req, res) {
		// req.session.viewingDJ = req.params.userID; // store the cookie with the last viewed DJ ID to load the next time '/producer' view is opened
		res.cookie('viewingDJ', req.params.userID); // store the cookie with the last viewed DJ ID to load the next time '/producer' view is opened

		userHandler.handleSingleUser(app, User, req.params.userID).then(function (data) {
			let userData = JSON.parse(data);
			// console.log("USER DATA", userData);
			return userData;
		}).then((loadUser) => {
			renderProd(req, res, false, loadUser); // need to include this render
		})
			.catch(err => {
				res.clearCookie('viewingDJ'); // this will clear the cookie to prevent redirecting to an invalid user at /producer/userID
				res.status(500).send(`
					Problem Loading User: \n ${err}
					<br>
					<h3><a href="/producer">Go Back and Try a Different User</a></h3>
				`);
			})
	})




	const ProducerHandler = require('./server/handlers/ProducerHandler.js');

	function handleFetchRequest(req, res, action, funcName) {
		ProducerHandler[funcName](req.params.userID, req.body.pListName, req.body.newData)
			.then((data) => {
				console.log(`${action} fetch received`);
				if (action == 'GET') {
					console.log("Sending data:", data);
					return res.status(200).json(data);
				} else {
					return res.status(200).send('Received fetch request');
				}
			})
			.catch(err => {
				console.error(err);
				return res.status(500).send(`${action} Error`);
			});
	}

	// handles server requests when there is a valid user ID in the URL, and a client-side fetch request is made
	// the last parameter is the name of the function that will be called to handle
	app.route('/producer/:userID').put((req, res) => {
		handleFetchRequest(req, res, 'update PUT', 'updateCurrPlaylist');

	}).post((req, res) => {
		handleFetchRequest(req, res, 'create POST', 'createPlaylist')

	}).delete((req, res) => {
		handleFetchRequest(req, res, 'DELETE', 'deletePlaylist')

	}).patch((req, res) => {
		// handleFetchRequest(req, res, 'rename PATCH', 'renameCurrPlaylist')

	})
}
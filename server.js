var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Global Static Files:
app.use(express.static(__dirname));
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

// index page
app.get('/producer', function(req, res) {
	
	res.render('pages/index');
});

app.listen(8080);
console.log('Server is listening on port 8080');
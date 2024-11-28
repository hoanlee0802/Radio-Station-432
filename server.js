require("dotenv").config();

const bodyParser = require("body-parser");
var express = require("express");

var app = express();
app.use(express.json())

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
app.set("view engine", "ejs");

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

const songHandler = require("./server/handlers/songLibraryHandler.js");
const userHandler = require("./server/handlers/userHandler.js");



//**  ROUTES:  **//

//* Producer Routes *//
require('./ProducerServer')(app); // Calls The ProducerServer function and passes in app as the parameter





//* DJ Routes
//...




const WEEK_START = "2024-11-27"; //temp placeholder for 'current' date

const path = require("path");

//* Manager Routes
app.get("/manager", function (req, res) {
  res.sendFile(path.join(__dirname, "manager/manager.html"));
});
// Fetch all users (DJs)
app.get("/manager/djs", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send("Error fetching DJs");
  }
});

// Add a new DJ
app.post("/manager/djs", async (req, res) => {
  const { name } = req.body;

  try {
    // Ensure the DJ name is unique
    const existingDJ = await User.findOne({ name });
    if (existingDJ) {
      return res.status(400).send("DJ name already exists");
    }

    const newDJ = new User({ name });
    await newDJ.save();
    res.status(201).send("DJ added successfully");
  } catch (error) {
    res.status(500).send("Error adding DJ");
  }
});

// Add DJ schedule
app.post("/manager/schedule", async (req, res) => {
  try {
    const { djID, dayOfWeek, timeSlot } = req.body;

    // Validation
    if (!djID || !dayOfWeek || !timeSlot) {
      return res
        .status(400)
        .send("Missing required fields: djID, dayOfWeek, or timeSlot.");
    }

    // Find the DJ by ID
    const dj = await User.findById(djID);
    if (!dj) {
      return res.status(404).send("DJ not found.");
    }

    // Add the schedule entry
    dj.schedule.push({ dayOfWeek, timeSlot });

    // Save the updated DJ to the database
    await dj.save();

    return res.status(200).send("Schedule updated successfully.");
  } catch (error) {
    console.error("Error updating schedule:", error);
    return res
      .status(500)
      .send("An error occurred while updating the schedule.");
  }
});

// Fetch the schedule for all DJs
app.get("/manager/schedule", async (req, res) => {
  try {
    const users = await User.find({}, "name schedule"); // Fetch DJs with their schedules
    const schedule = [];

    users.forEach((user) => {
      user.schedule.forEach((slot) => {
        schedule.push({
          djName: user.name, // DJ name
          dayOfWeek: slot.dayOfWeek, // Day of the week
          timeSlot: slot.timeSlot, // Time slot
        });
      });
    });

    res.status(200).json(schedule); // Send the aggregated schedule
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).send("An error occurred while fetching the schedule.");
  }
});

// Update a DJ's timeslot
app.put("/manager/schedule", async (req, res) => {
  const { djID, timeSlot, dayOfWeek, newTimeSlot } = req.body;

  try {
    const user = await User.findOne({ _id: djID });

    if (!user) {
      return res.status(404).json({ message: "DJ not found" });
    }

    // Find and update the schedule item with the new timeslot
    const scheduleItem = user.schedule.find(
      (item) => item.dayOfWeek === dayOfWeek && item.timeSlot === timeSlot
    );

    if (!scheduleItem) {
      return res.status(404).json({ message: "Timeslot not found" });
    }

    // Update the timeslot to the new one
    scheduleItem.timeSlot = newTimeSlot;

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: "Timeslot updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating schedule" });
  }
});

// Delete a DJ's timeslot
app.delete("/manager/schedule", async (req, res) => {
  const { djName, timeSlot, dayOfWeek } = req.body;

  console.log("Received DELETE request:", { djName, timeSlot, dayOfWeek }); // Should print in console

  try {
    const user = await User.findOne({ name: djName });

    if (!user) {
      return res.status(404).json({ message: "DJ not found." });
    }

    const result = await User.updateOne(
      { name: djName },
      { $pull: { schedule: { dayOfWeek, timeSlot } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Schedule entry not found." });
    }

    res.status(200).json({ message: "Timeslot deleted successfully!" });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});




//* create a connection to database *//
require("./server/handlers/dataConnector.js").connect();

app.use(function (req, res, next) {
  res.status(404).send("<h2>Page not found (404)</h2>"); // when a resource is not found, send this to web page
});

const port = process.env.PORT;
app.listen(port);
console.log("\nServer is listening on port= " + port);

const User = require("../models/User");
const Schedule = require("../models/Schedule");

// Fetch all DJs
exports.getAllDJs = async () => {
  try {
    return await User.find({});
  } catch (err) {
    console.error("Error fetching DJs:", err);
    throw err;
  }
};

// Add a new DJ
exports.addDJ = async (name) => {
  try {
    const newUser = new User({ name });
    await newUser.save();
    return newUser;
  } catch (err) {
    console.error("Error adding DJ:", err);
    throw err;
  }
};

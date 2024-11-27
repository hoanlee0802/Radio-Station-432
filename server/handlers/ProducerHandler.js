const Song = require('../models/Song');
const User = require('../models/User');

const updateCurrPlaylist = (userID, listName, newData) => {
    return new Promise((resolve, reject) => {
        User.findById(userID)
            .then(user => {
                if (!user) {
                    console.error("User not found");
                    return reject(new Error("User not found"));
                }
                user.currPlaylist = listName;
                user.playlists = newData;
                console.log("Updated database");
                return user.save();
            })
            .then(() => {
                resolve("Playlist updated successfully");
            })
            .catch(err => {
                console.error("Error updating playlists", err);
                reject(new Error("Error updating playlists"));
            });
    });
}

module.exports = {
    updateCurrPlaylist
}
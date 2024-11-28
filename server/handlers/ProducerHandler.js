//* Update the user data on the playlist after detecting the client-side fetch request through server.js
const User = require('../models/User');

const updateCurrPlaylist = (userID, listName, newData) => {
    return new Promise((resolve, reject) => {
        User.findById(userID)
            .then(user => {
                if (!user) {
                    // console.error("User not found");
                    return reject(new Error("User not found"));
                }
                user.currPlaylist = listName;
                user.playlists.data[listName] = newData;

				user.markModified(`playlists.data.${listName}`); // by default MongoDB does not check sub-properties
                return user.save();
            })
            .then(() => {
                resolve("Playlist updated successfully"); // Note: this message will not show up in terminal
            })
            .catch(err => {
				// console.error("Error updating playlists", err);
                reject(new Error("Error updating playlists"));
            });
    });
}

const createPlaylist = (userID, listName) => {
	return new Promise((resolve, reject) => {
		User.findById(userID)
			.then(user => {
				if (!user) return reject(new Error("User not found"));

				if (!user.playlists.names.includes(listName)) { // double check the playlist does not already exist in DB
					user.currPlaylist = listName;
					user.playlists.names.push(listName);
				} else {
					new Error("Playlist already exists"); return;
				}

				
				user.playlists.data[listName] = []; // initializes empty object for that playlist
				user.markModified(`playlists.data.${listName}`);
				user.markModified(`playlists.names`);
				return user.save();
			})
			.then(() => {
				resolve("Playlist created successfuly");
			})
			.catch((err) => {
				reject(new Error("Error creating playlist"));
			})
	})
}

const deletePlaylist = (userID, listName) => {
	return new Promise((resolve, reject) => {
		User.findById(userID)
			.then(user => {
				if (!user) return reject(new Error("User not found"));

				// remove playlist
				user.playlists.names = user.playlists.names.filter(name => name != listName);
				// console.log(`Deleting: `, listName);
				delete user.playlists.data[`${listName}`];
				
				user.markModified(`playlists`);
				user.markModified(`playlists.names`);
				user.markModified(`playlists.data`);
				return user.save();
			})
			.then((savedUser) => {
				resolve("Playlist deleted successfuly");
			})
			.catch(() => {
				reject(new Error("Error deleting playlist"))
			})
	});
}

const userHandler = require('./userHandler.js');

const getPlaylists = (userID) => {
	return new Promise((resolve, reject) => {
		console.log("Fetching playlists for user ID:", userID);
		User.findById(userID)
			.then(user => {
				if (!user) {
					console.error("User not found");
					return reject(new Error("User not found"));
				}
				console.log("User found:", user);
				return resolve({
					playlists: user.playlists
				});
			})
			.catch((err) => {
				console.error("Error fetching user:", err);
				reject(err);
			})
	});
}
module.exports = {
    updateCurrPlaylist,
	createPlaylist,
	deletePlaylist,
	getPlaylists
}
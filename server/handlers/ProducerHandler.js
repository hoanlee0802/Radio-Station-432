//* Update the user data on the playlist after detecting the client-side fetch request through server.js
const User = require('../models/User');


const updateCurrPlaylist = (userID, listName, newData) => {
    return new Promise((resolve, reject) => {
		User.updateOne( // .updateOne() will guarantee that there is no version conflict (concurrency) when updating a playlist with added song after auto-creating playlist
			{ _id: userID },
			{
				$set: {
					currPlaylist: listName,
					[`playlists.data.${listName}`]: newData
				}
			}
		).then(() => {
			resolve("Playlist updated successfully"); // Note: this message will not show up in terminal
		})
		.catch(err => {
			// console.error("Error updating playlists", err);
			reject(new Error(`Error updating playlists \n	${err}`));
		});
    });
}


const renameCurrPlaylist = (userID, oldName, newName) => {
	return new Promise((resolve, reject) => {
		User.findById(userID)
			.then(user => {
				if (!user) {
					// console.error("User not found");
					return reject(new Error("User not found"));
				}
				// update playlist names list
				const index = user.playlists.names.indexOf(oldName);
				user.playlists.names[index] = newName;
				// copy data from old property name
				user.playlists.data[newName] = user.playlists.data[oldName];

				// delete the old property
				delete user.playlists.data[oldName];
				user.currPlaylist = newName;

				user.markModified(`playlists`);
				user.markModified(`playlists.names`);
				user.markModified(`playlists.data.${newName}`); // by default MongoDB does not check sub-properties
				return user.save();
			})
			.then(() => {
				console.log("Successful rename");
				resolve("Playlist renamed successfully"); // Note: this message will not show up in terminal
			})
			.catch(err => {
				// console.error("Error updating playlists", err);
				reject(new Error("Error renaming playlist"));
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

				if (!user.playlists.data) user.playlists.data = {};

				user.playlists.data[listName] = []; // initializes empty object for that playlist

				user.markModified(`playlists.data.${listName}`);
				user.markModified(`playlists.names`);
				return user.save();
			})
			.then(() => {
				resolve("Playlist created successfuly");
			})
			.catch((err) => {
				reject(new Error(`Error creating playlist: \n	${err}`,));
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
				reject(new Error(`Error deleting playlist: \n${err}`))
			})
	});
}


module.exports = {
    updateCurrPlaylist,
	renameCurrPlaylist,
	createPlaylist,
	deletePlaylist
}
// recall that const lets you change object properties just not the object reference
let currDJ = { // Object maintains a temporary state of DJ data currently being edited
	id: undefined,
	name: undefined,

	currPlaylist: undefined,
	playlists: {
		names: [],
		data: {
			// Example of how the data will look:
			// "playlistName": [
			// 		{id: 1, name: 'mySong1'},
			// 		{id: 2, name: 'mySong2'}
			// ]
		}
	},
	getPlist: function() { return this.playlists.data[this.currPlaylist]},
	setPlist: function(array) { this.playlists.data[this.currPlaylist] = array}
}


// sends an HTTP Method request at the current URL of /producer/{userID}
async function playlistDB(action, reName) {
	let HTTPmethod = 'GET'; // no valid action specified assumes GET
	let useData = false;
	switch (action) {
		case 'update':
			HTTPmethod = 'PUT'; useData = true; // these include new data in the body
			break;
		case 'create':
			HTTPmethod = 'POST'; useData = true; // these include new data in the body
			break;
		case 'delete':
			HTTPmethod = 'DELETE';
			break;
		case 'rename':
			HTTPmethod = 'PATCH';
			break;
	}
	await fetch(window.location.pathname, {
		method: HTTPmethod,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: currDJ.id,
			pListName: currDJ.currPlaylist,
			newData: useData ? currDJ.getPlist() : reName // stringify will automatically remove undefined properties (i.e. if reName is not specified)
		})
	})
	.then(data => { // console.log("Fetch request successful", data);
		return data;
	})
	.catch(err => console.error(err));
}


function createPlaylist(name, data) {
	let playlist = currDJ.playlists;

	if (name == undefined) {
		let num = 1;
		let checked = `Playlist ${num}`;
		while (playlist.names.includes(checked)) {
			num++;
			checked = `Playlist ${num}`;
		}
		name = checked; // name is now verified
	} else {
		name = prompt("Enter Playlist Name");
		if (name == undefined) return false; // user cancelled the prompt
		if (playlist.names.includes(name) || name.trim() == '') {
			let newName = prompt(`Name already used/invalid.`).trim();
			while (newName) {
				if (playlist.names.includes(newName) || newName.trim() == '')
					newName = prompt(`"${newName}" is still a used/invalid name`).trim();
				else
					break; // newName is unique and not just whitespace
			}
			if (!newName)
				return false; // PlayList Creation Aborted
			name = newName; // othewise name is newName
		}
	}
	currDJ.playlists.names.push(name);
	currDJ.playlists.data[name] = [];

	currDJ.currPlaylist = name; // global object will indicate the current playlist

	playlistDB('create');
	
	return true; // success
}

function deletePlaylist() {
	const check = confirm(`Are you sure you want to delete the playlist "${currDJ.currPlaylist}"?`);
	if (check && currDJ.getPlist()) {
		playlistDB('delete'); // delete from database before deleting locally (need to ref. currPlaylist)

		delete currDJ.playlists.data[currDJ.currPlaylist]; // removes the object property (key) from the list
		currDJ.playlists.names = currDJ.playlists.names.filter(name => name != currDJ.currPlaylist);
		currDJ.currPlaylist = undefined;

		return true;
	}
}

function renamePlaylist() {
	const label = currDJ.currPlaylist;
	const ask = prompt(`What would you like to rename the playlist "${currDJ.currPlaylist}"?`).trim();

	if (ask) {
		if (currDJ.playlists.names.includes(ask)) {
			alert("That name already exists.");
			return false;
		}

		const index = currDJ.playlists.names.indexOf(label);
		currDJ.playlists.names[index] = ask;

		const storeData = currDJ.getPlist();
		delete currDJ.playlists.data[currDJ.currPlaylist];
		currDJ.currPlaylist = ask;
		currDJ.setPlist(storeData);

		playlistDB('rename', ask);

		return true;
	}
}

function pushSong(id, name) {
	if (currDJ.currPlaylist != undefined) {
		currDJ.getPlist().push({
			id: id, 
			name: name
		});
		console.log(`current playlist: ${currDJ.currPlaylist}`);

		playlistDB('update');
	}
}

function removeSong(id) {
	let newList;
	if (currDJ.getPlist()) {
		newList = currDJ.getPlist().filter(song => song.id !== id);
		currDJ.setPlist(newList);
		console.log(`current playlist: ${currDJ.currPlaylist}`);

		playlistDB('update');
	}
}

function loadSongs() {
	return (currDJ.currPlaylist ? currDJ.getPlist() : []);
}

export {
    currDJ,
    createPlaylist,
    deletePlaylist,
    renamePlaylist,
    pushSong,
    removeSong,
    loadSongs,
    playlistDB
};
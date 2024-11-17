// recall that const lets you change object properties just not the object reference
const currDJ = { // Object maintains a temporary state of DJ data currently being edited
	name: undefined,

	currPlaylist: undefined,
	playlist: {
		names: [],
		data: {
			// Example of how the data will look:
			// "playlistName": [
			// 		{id: 1, name: 'mySong1'},
			// 		{id: 2, name: 'mySong2'}
			// ]
		}
	},
	getPlist: function() { return this.playlist.data[this.currPlaylist]},
	setPlist: function(array) { this.playlist.data[this.currPlaylist] = array}
}

const set = function setLocal(item, value) {
	localStorage.setItem(item, value);
}

const get = function getLocal(item) {
	return localStorage.getItem(item);
}

function createPlaylist(name, data) {
	let playlist = currDJ.playlist;

	if (name == undefined) {
		let num = 1;
		let checked = `Playlist ${num}`;
		while (playlist.names.includes(checked)) {
			num++;
			checked = `Playlist ${num}`;
		}
		name = checked; // name is now verified
	} else {
		if (playlist.names.includes(name) || name.trim() == '') {
			let newName = prompt(`Name already used/invalid.`).trim();
			while (newName) {
				if (playlist.names.includes(newName) || newName.trim() == '')
					newName = prompt(`"${newName}" is still a used/invalid name`).trim();
				else
					break;
			}
			if (!newName.trim())
				return false; // PlayList Creation Aborted
			name = newName; // othewise name is newName
		}
	}
	currDJ.playlist.names.push(name);
	currDJ.playlist.data[name] = [];

	currDJ.currPlaylist = name; // global object will indicate the current playlist
	
	return true; // success
}

function deletePlaylist() {
	const check = confirm("Are you sure you want to delete this playlist?");
	if (check && currDJ.getPlist()) {
		delete currDJ.playlist.data[currDJ.currPlaylist]; // removes the object property (key) from the list
		currDJ.playlist.names = currDJ.playlist.names.filter(name => name != currDJ.currPlaylist);
		currDJ.currPlaylist = undefined;
	}
}

function appendSong(id, name) {
	if (currDJ.currPlaylist != undefined) {
		currDJ.getPlist().push({
			id: id, 
			name: name
		});
	}
}

function removeSong(id) {
	let newList;
	if (currDJ.getPlist()) {
		newList = currDJ.getPlist().filter(song => song.id !== id);
		currDJ.setPlist(newList);
	}
}

function loadSongs() {
	return currDJ.currPlaylist ? currDJ.getPlist() : [];
}

export {currDJ, createPlaylist, deletePlaylist, appendSong, removeSong, loadSongs};
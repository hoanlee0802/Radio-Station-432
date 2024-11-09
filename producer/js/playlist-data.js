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
	}
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
			console.log('exited loop');
			if (!newName.trim())
				return false; // PlayList Creation Aborted
			name = newName; // othewise name is newName
		}
	}
	playlist.names.push(name);
	playlist.data[name] = [];

	currDJ.currPlaylist = name; // global object will indicate the current playlist
	currDJ.playlist.data[name] = [];
	
	return true; // success
}

function appendSong(id, name) {
	if (currDJ.currPlaylist != undefined) {
		currDJ.playlist.data[currDJ.currPlaylist].push({
			id: id, 
			name: name
		});
	}
}

function loadSongs() {
	return currDJ.playlist.data[currDJ.currPlaylist];
}

export {currDJ, createPlaylist, appendSong, loadSongs};
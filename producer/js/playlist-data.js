const currDJ = {
	name: undefined,

	currPlaylist: undefined,
	playlist: {
		names: [],
		data: [
			// playlistName: [ {id: 1, songName: 'mySong'} ]
		]
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
			check = `Playlist ${num}`;
		}
		name = checked; // name is now verified
	} else {
		if (playlist.names.includes(name)) {
			let newName = prompt("Name already used");
			while (newName) {
				if (playlist.names.includes(newName)) {
					newName = prompt("Still a used name");
				}
				// Loop will exit automatically
			}
			if (!newName)
				return false; // PlayList Creation Aborted
			name = newName; // othewise name is newName
		}
	}
	playlist.names.push(name);
	playlist.data[name] = [];

	currDJ.currPlaylist = name; // global object will indicate the current playlist
	
	return true; // success
}

function addSong(id, name) {
	if (currPlaylist != undefined) {
		playlist.data[currPlaylist].push({
			id: id, 
			name: name
		});
	}
}

export {currDJ, createPlaylist, addSong};
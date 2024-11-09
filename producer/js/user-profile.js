/* This Module has to do with the WorkSpace of the Producer */
class DJProfile {
	// we will also remember what playlist we were editing as a Producer for a particular User Profile
	constructor(name, playlists, onPlaylist) {
		this.name = name; // name of DJ Profile data pertains to
		this.playlists = playlists; // will store object with all playlist names and data for particular DJ
		this.onPlaylist = onPlaylist; // will remember which Playlist the producer was last working on
	}

	/* All Functions in class syntax are **prototypes**, meaning they are shared across instances */
	/* (However, the actual data stored is still unique to each instance of course) */
	info() {console.log(`The playlist "${this.onPlaylist}" of ${this.name} is being edited in the workspace.`)}

	getName() { return this.name }
	getPlaylists() { return this.playlists }
	getOnPlaylist() { return this.onPlaylist }

	setPlaylists(playlists) {
		this.playlists = playlists;
	}

	setOnPlaylist(newPlaylist) {
		this.onPlaylist = newPlaylist;
	}
}

let all = []; // all of the profile objects will be stored here

export { DJProfile, all }
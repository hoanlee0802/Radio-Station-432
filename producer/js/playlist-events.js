import { _el } from '../../global.js';
import * as dj from './playlist-data.js';
import { setSessionData } from './select-dj.js';


function namePlaylist() {
	const success = dj.createPlaylist(true);
	
	if (success) {
		_el('section.right .playlist-info').style.display = 'none';
		updatePlaylists(true);
	}
	return success;
}

function removePlaylist() {
	dj.deletePlaylist();
}

function renamePlaylist() {
	dj.renamePlaylist();
}

function createOption(name, value) {
	const select = _el('select.playlist');
	const option = document.createElement('option');
	option.textContent = name;
	if (value != null) option.value = value;
	select.appendChild(option);
	return option; // further manipulation of element enabled
}

let prevIndex; // will remember the last selected option in case user aborts playlist creation
// this function updates the playlist selection dropdown
function updatePlaylists(match) {
	const select = _el('select.playlist');
	select.textContent = ''; // empty the select Element
	let opt = createOption('Select Playlist', 'select');
	opt.selected = true; // Sets the default no playlist selected option
	if (dj.currDJ.playlists.names.length > 0 && dj.currDJ.currPlaylist != undefined) {
		_el('table').classList.remove('disabled');
		_el('.playlist-info').style.display = 'none';
	} else {
		_el('.playlist-info').style.display = 'block';
		_el('table').classList.add('disabled');
	}
	
	dj.currDJ.playlists.names.forEach(function (name) {
		opt = createOption(name);
		if (match) {
			if (match == name) {
				opt.selected = true;
			}
		}
	})
	if (match === true) { // select the last added/created playlist if true is passed in
		opt.selected = true;
	}
	prevIndex = select.selectedIndex; // will remember the current selection in case user aborts playlist creation
	createOption('--+ Create New +--', 'create');
}

function songsUI() {
	const songDatabse = document.querySelectorAll('section.left ul li'); // general song sources

	const songList = _el('section.right ul'); // curated song playlist

	const clearAddedCSS = () => {
		songDatabse.forEach(function (song) {
			song.classList.remove('added');
		})
	}

	const displaySongs = () => {
		const songs = dj.loadSongs();
		
		songList.textContent = '';
		if (songs) {
			songs.forEach(function (song) {
				// const li = document.createElement('li');
				const element = `
			<li class="song" data-id="${song.id}">
				<i class="material-symbols-outlined">play_arrow</i>
				${song.name}
				<i class="material-symbols-outlined right">cancel</i>
			</li>`;

				// this line querySelector line makes sure that 
				_el(`section.left ul li[data-id="${song.id}"]`).classList.add('added');

				songList.innerHTML += element;

			})
		}
	}

	clearAddedCSS();
	displaySongs();
}

document.addEventListener('DOMContentLoaded', function() {
	const select = _el('select.playlist');
	const deleteBtn = _el('button.delete');
	const renameBtn = _el('button.rename');

	select.addEventListener('change', function() {
		if (select.value) {
			if (select.value == 'create') {
				
				const success = namePlaylist();
				if (!success) select.selectedIndex = prevIndex; // if the user aborted playlist creation, go back to last selected option
				
			} else if (select.value == 'select') { // placeholder select playlist option
				dj.currDJ.currPlaylist = undefined;
				_el('.playlist-info').style.display = 'block';
				_el('table').classList.add('disabled');
			} else { // user is selecting existing playlist
				dj.currDJ.currPlaylist = select.options[select.selectedIndex].text;
				_el('.playlist-info').style.display = 'none';
				_el('table').classList.remove('disabled');

				
			}
			prevIndex = select.selectedIndex; // store the previously selected playlist
			setSessionData();
			
			songsUI();
		}
	})

	deleteBtn.addEventListener('click', function() {+
		removePlaylist();
		updatePlaylists();
		songsUI();
	})

	renameBtn.addEventListener('click', function() {
		renamePlaylist();
		updatePlaylists(dj.currDJ.currPlaylist);
	})
})

export { updatePlaylists, songsUI }
import * as dj from './playlist-data.js';
import { setSessionData } from './select-dj.js';


function namePlaylist() {
	let newName = prompt("Enter Playlist Name").trim();
	const success = dj.createPlaylist(newName);
	if (success) {
		document.querySelector('section.right .playlist-info').style.display = 'none';
	}
}

function createOption(name, value) {
	const select = document.querySelector('select.playlist');
	const option = document.createElement('option');
	option.textContent = name;
	if (value != null) option.value = value;
	select.appendChild(option);
	return option; // further manipulation of element enabled
}

// this function updates the playlist selection dropdown
function updatePlaylists(match) {
	const select = document.querySelector('select.playlist');
	select.textContent = ''; // empty the select Element
	createOption('Select Playlist', 'select')
	dj.currDJ.playlist.names.forEach(function (name) {
		const opt = createOption(name);
		if (match) {
			if (match == name) {
				opt.selected = true;
			}
		} else {
			opt.selected = true; // Will select the last created playlist if no match is specified
		}
		
	})
	createOption('--+ Create New +--', 'create');
}

function songsUI() {
	const songDatabse = document.querySelectorAll('section.left ul li'); // general song sources

	const songList = document.querySelector('section.right ul'); // curated song playlist

	const clearAddedCSS = () => {
		songDatabse.forEach(function (song) {
			song.classList.remove('added');
		})
	}

	const displaySongs = () => {
		const songs = dj.loadSongs();
		songList.textContent = '';
		songs.forEach(function (song) {
			// const li = document.createElement('li');
			const element = `
			<li class="song" data-id="${song.id}">
				<i class="material-symbols-outlined">play_arrow</i>
				${song.name}
				<i class="material-symbols-outlined right">cancel</i>
			</li>`;

			// this line querySelector line makes sure that 
			document.querySelector(`section.left ul li[data-id="${song.id}"]`).classList.add('added');

			songList.innerHTML += element;

		})
	}

	clearAddedCSS();
	displaySongs();
}

document.addEventListener('DOMContentLoaded', function() {
	const select = document.querySelector('select.playlist');
	
	select.addEventListener('change', function() {
		if (select.value) {
			if (select.value == 'create') {
				namePlaylist();
				updatePlaylists();
			} else if (select.value == 'select') { // placeholder select playlist option
				dj.currDJ.currPlaylist = undefined;
				document.querySelector('.playlist-info').style.display = 'block';
			} else { // user is selecting existing playlist
				dj.currDJ.currPlaylist = select.options[select.selectedIndex].text;
				document.querySelector('.playlist-info').style.display = 'none';
			}
			setSessionData();
			
			songsUI();
		}
	})
})

export { updatePlaylists, songsUI }
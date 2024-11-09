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
function updatePlaylists() {
	const select = document.querySelector('select.playlist');
	select.textContent = ''; // empty the select Element
	createOption('Select Playlist', '')
	dj.currDJ.playlist.names.forEach(function (name) {
		const opt = createOption(name);
		opt.selected = true;
	})
	createOption('--+ Create New +--', 'create');
}


document.addEventListener('DOMContentLoaded', function() {
	const songDatabse = document.querySelectorAll('section.left ul li');

	const select = document.querySelector('select.playlist');
	const songList = document.querySelector('section.right ul');

	function clearAddedCSS() {
		songDatabse.forEach(function (song) {
			song.classList.remove('added');
		})
	}

	function displaySongs() {
		setSessionData();
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

	select.addEventListener('change', function() {
		// console.log('select has a value');
		if (select.value) {
			clearAddedCSS();
			if (select.value == 'create') {
				namePlaylist();
				updatePlaylists();
				displaySongs();
			} else if (select.value == '') { // placeholder select playlist option
				dj.currDJ.currPlaylist = undefined;
				document.querySelector('.playlist-info').style.display = 'block';
			} else { // user is selecting existing playlist
				dj.currDJ.currPlaylist = select.options[select.selectedIndex].text;
				displaySongs();
			}
		}
	})
})

export { updatePlaylists }
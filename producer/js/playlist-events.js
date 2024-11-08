import * as dj from './playlist-data.js';



function namePlaylist() {
	let newName = prompt("Enter Playlist Name");
	const success = dj.createPlaylist(newName);

}

document.addEventListener('DOMContentLoaded', function() {
	const select = document.querySelector('select.playlist');

	function updateList() {
		select.textContent = ''; // empty the select Element
		dj.currDJ.playlist.names.forEach(function (songName) {
			const option = document.createElement('option');
			option.textContent = songName;
			select.appendChild(option);
		})
		const option = document.createElement('option');
		option.value = 'create';
		option.textContent = '--+ Create New +--';
		select.appendChild(option);
	}

	select.addEventListener('change', function() {
		// console.log('select has a value');
		if (select.value) {
			if (select.value == 'create') {
				namePlaylist();
				updateList();
			}
		}
	})
})
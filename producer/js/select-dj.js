import { _el } from '../../global.js';
import * as dj from './playlist-data.js';

import { updatePlaylists, songsUI } from './playlist-events.js';

function listDJs() {
	_el('#selectDJ').classList.toggle('hide');
}

let currID; // this will store the current ID, which is also stored in the browser URL

let find;

async function getSessionData(name) {
	let user = window.userData;
	dj.currDJ.id = user['_id'];

	dj.currDJ.name = user.name;
	dj.currDJ.currPlaylist = user.currPlaylist;

	// Ensure data is initialized (in case of anomolous database values like null or undefined):
	dj.currDJ.playlists.names = user.playlists.names || [];
	dj.currDJ.playlists.data = user.playlists.data || {};

	console.log(dj.currDJ);

	updatePlaylists(dj.currDJ.currPlaylist);
	songsUI();
}

function setSessionData() {
	if (find) {
		find.setOnPlaylist(dj.currDJ.currPlaylist);
		find.setPlaylists(dj.currDJ.playlists);
	}
	
	songsUI();
}


document.addEventListener('DOMContentLoaded', function() {
	getSessionData(); // Will work fine whether or not there is a user ID in the URL


	const confirmBtn = _el('#selectDJ form');
	const listDJ = _el('header span.right');

	const selectDJ = _el('#selectDJ select.dj')
	const timeslot = _el('#selectDJ select.timeslot');

	let selected;

	selectDJ.addEventListener('change', function() {
		if (selectDJ.value != "") {
			timeslot.removeAttribute('disabled');
			selected = selectDJ.options[selectDJ.selectedIndex];
			
		} else {
			timeslot.setAttribute('disabled', '');
			timeslot.value = "";
		}


	})


	confirmBtn.addEventListener('submit', function(e) {
		e.preventDefault();
		currID = selected.getAttribute('data-id');

		window.location.pathname = `/producer/${currID}`;
	});
	
	listDJ.addEventListener('click', function() {
		listDJs();
	})
})

export {setSessionData}
import { _el } from '../../global.js';
import * as dj from './playlist-data.js';
// import * as profiles from './user-profile.js';
import { DJProfile } from './user-profile.js';
import { updatePlaylists, songsUI } from './playlist-events.js';

function listDJs() {
	_el('#selectDJ').classList.toggle('hide');
}

let currID; // this will store the current ID, which is also stored in the browser URL

let find;

async function getSessionData(name) {
	// dj.currDJ = { ...userData }; // setting the entire currDJ object did not work
	let user = window.userData;
	dj.currDJ.id = user['_id']; // We do not actually use the stored id in currDJ for now

	dj.currDJ.name = user.name;
	dj.currDJ.currPlaylist = user.currPlaylist;
	dj.currDJ.playlists = user.playlists;
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
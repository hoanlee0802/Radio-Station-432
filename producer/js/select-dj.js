import { _el } from '../../global.js';
import * as dj from './playlist-data.js';
// import * as profiles from './user-profile.js';
import { DJProfile } from './user-profile.js';
import { updatePlaylists, songsUI } from './playlist-events.js';

function listDJs() {
	_el('#selectDJ').classList.toggle('hide');
}

let find;

async function getSessionData(name) {
	try {
		console.log("Fetching session data for:", name);
		const user = await dj.getAllData(); // Ensure this is awaited
		console.log("Fetched user data:", user);

		dj.currDJ.currPlaylist = user.currPlaylist; // Corrected line
		dj.currDJ.playlist = user.playlists;
		find = user.playlists;

		dj.currDJ.name = name;
		updatePlaylists(dj.currDJ.currPlaylist); // providing name parameter looks for match
		songsUI();
	} catch (error) {
		console.error("ERROR", error);
	}
}

function setSessionData() {
	if (find) {
		find.setOnPlaylist(dj.currDJ.currPlaylist);
		find.setPlaylists(dj.currDJ.playlist);
	}
	
	songsUI();
}


document.addEventListener('DOMContentLoaded', function() {
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
		// very important that we put the ID in teh url before getting session data
		if (window.location.pathname.split('/').pop() == '') { // check if ID is set in URL yet
			window.location.pathname = `/producer/${selected.getAttribute('data-id')}`;

		}

		getSessionData(selected.text);
		

		listDJs(); // this will hide the DJ list
	});
	
	listDJ.addEventListener('click', function() {
		listDJs();
	})
})

export {setSessionData}
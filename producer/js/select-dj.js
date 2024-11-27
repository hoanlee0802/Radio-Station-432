import { _el } from '../../global.js';
import * as dj from './playlist-data.js';
import * as profiles from './user-profile.js';
import { DJProfile } from './user-profile.js';
import { updatePlaylists, songsUI } from './playlist-events.js';

function listDJs() {
	_el('#selectDJ').classList.toggle('hide');
}

let find;

function getSessionData(name) {
	find = profiles.all.find(obj => obj.name == name);
	if (find) {
		dj.currDJ.currPlaylist = find.getOnPlaylist();
		dj.currDJ.playlist = find.getPlaylists();
	} else {
		const profile = new DJProfile(name, {names: [], data: {}}, undefined);
		find = profile;
		
		profiles.all.push(profile);

		dj.currDJ.currPlaylist = undefined;
		dj.currDJ.playlist = {names: [], data: {}};
	}

	dj.currDJ.name = name;
	updatePlaylists(dj.currDJ.currPlaylist); // providing name parameter looks for match
	songsUI();
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
		getSessionData(selected.text);

		window.location.pathname = `/producer/${selected.getAttribute('data-id')}`;

		listDJs(); // this will hide the DJ list
	});
	
	listDJ.addEventListener('click', function() {
		listDJs();
	})
})

export {setSessionData}
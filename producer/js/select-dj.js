import * as dj from './playlist-data.js';
import * as profiles from './user-profile.js';
import { DJProfile } from './user-profile.js';
import { updatePlaylists, songsUI } from './playlist-events.js';

function $(selector) {
	return document.querySelector(selector);
}

function listDJs() {
	$('#selectDJ').classList.toggle('hide');
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
	const confirmBtn = $('#selectDJ form');
	const listDJ = $('header span.right');

	const selectDJ = $('#selectDJ select.dj')
	const timeslot = $('#selectDJ select.timeslot');

	selectDJ.addEventListener('change', function() {
		if (selectDJ.value != "") {
			timeslot.removeAttribute('disabled');
		} else {
			timeslot.setAttribute('disabled', '');
			timeslot.value = "";
		}
	})


	confirmBtn.addEventListener('submit', function(e) {
		e.preventDefault();
		getSessionData(selectDJ.options[selectDJ.selectedIndex].text);

		listDJs(); // this will hide the DJ list
	});
	
	listDJ.addEventListener('click', function() {
		listDJs();
	})
})

export {setSessionData}
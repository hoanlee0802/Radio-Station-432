import * as dj from './playlist-data.js';
import * as profiles from './user-profile.js';
import { DJProfile } from './user-profile.js';

function $(selector) {
	return document.querySelector(selector);
}

function listDJs() {
	$('#selectDJ').classList.toggle('hide');
}


function getSessionData(name) {
	const find = profiles.all.find(obj => obj.name == name);
	if (find) {
		dj.currDJ.currPlaylist = filter.getOnPlaylist();
		dj.currDJ.playlist = filter.getPlaylists();
	} else {
		const profile = new DJProfile(name, {}, undefined);
		profiles.all.push(profile);
	}

	dj.currDJ.name = name;
}

function setSessionData(name) {
	const find = profiles.all.find(obj => obj.name == name);
	if (find) {
		filter.setOnPlaylist(dj.currDJ.currPlaylist);
		filter.setPlaylists(dj.currDJ.playlist);
	}
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
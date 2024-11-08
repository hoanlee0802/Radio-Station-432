function $(selector) {
	return document.querySelector(selector);
}

function listDJs() {
	$('#selectDJ').classList.toggle('hide');
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
		listDJs(); // this will hide the DJ list
	});
	
	listDJ.addEventListener('click', function() {
		listDJs();
	})

})
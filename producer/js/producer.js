import * as dj from './playlist-data.js';
import { updatePlaylists } from './playlist-events.js';

function $(selector) {
	return document.querySelector(selector);
}

document.addEventListener('DOMContentLoaded', function() {
	const songLists = $("section ul");
	const songList1 = $("section.left ul");
	const songList2 = $("section.right ul");

	/* Adds song to the second list */
	function addSong(ref) {
		$('.playlist-info').style.display = 'none';
		if (!ref.classList.contains('added')) {
			if (dj.currDJ.currPlaylist == undefined) {
				dj.createPlaylist();
				updatePlaylists();
			}

			const songCopy = ref.cloneNode(); // cloning the Node only clones the highest level element (li in this case)
			songCopy.innerHTML = ref.innerHTML;
			
			songCopy.querySelector('i').textContent = ''; // ensure pause button is not duplicated
			songCopy.querySelector('.right').textContent = ''; // change add_circle to cancel

			// before adding text content of list element, empty the list element except for main song text
			dj.appendSong(songCopy.getAttribute('data-id'), songCopy.textContent);

			songCopy.querySelector('i').textContent = 'play_arrow'; // ensure pause button is not duplicated
			songCopy.querySelector('.right').textContent = 'cancel'; // change add_circle to cancel
			songList2.append(songCopy);

			ref.classList.add('added');
		}
	}

	/* Removes song from the second list */
	function removeSong(ref) {
		const id = ref.getAttribute('data-id');
		const addedEle = songList1.querySelector(`li[data-id="${id}"]`);
		addedEle.classList.remove('added');
		ref.remove();
	}

	function action(ele, icon) {
		if (icon == 'play_arrow') {
			prevPlaying.textContent = 'play_arrow'; // pause previous playing song

			ele.textContent = 'pause';

			prevPlaying = ele; // note current playing element to change back in the future
		} else if (icon == 'pause') {
			ele.textContent = 'play_arrow';
		} else if (icon == 'add_circle') {
			addSong(ele.parentElement);
		} else if (icon == 'cancel') {
			removeSong(ele.parentElement);
		}
	}

	songList1.addEventListener('click', function(e) {
		const ele = e.target;
		if (ele.tagName == 'I') {
			const icon = e.target.textContent;
			action(ele, icon);
		}
		
	});
	songList2.addEventListener('click', function (e) {
		const ele = e.target;
		if (ele.tagName == 'I') {
			const icon = e.target.textContent;
			action(ele, icon);
		}
		
	})

	let prevPlaying = document.createElement('i'); // contains dummy element in the beginning
	songList1.addEventListener("dblclick", function (e) {
		const ele = e.target;

		if (ele.tagName != 'UL') {
			if (ele.tagName == 'LI')
				addSong(ele);
		}
	});

	songList2.addEventListener("dblclick", function (e) {
		const ele = e.target;

		if (ele.tagName != 'UL') {
			if (ele.tagName == 'LI')
				removeSong(ele);
		}
	});
})

function showSidebar() {
	const sidebar = document.querySelector('#sidebar');
	sidebar.classList.toggle('show');
}
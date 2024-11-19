const timeSlotSelect = document.getElementById('timeSlotSelect');
const playlistNameInput = document.getElementById('playlistName');
const playlistTableBody = document.getElementById('playlistTableBody');

const timeSlotPlaylists = {
    '9:00 - 11:00': {
        name: 'Morning Playlist',
        songs: [
            { icon: '🎵', title: 'Morning Melody', artist: 'Artist A' },
            { icon: '🎵', title: 'Sunrise Tune', artist: 'Artist B' },
            { icon: '🎵', title: 'Wake Up Song', artist: 'Artist C' },
            { icon: '🎵', title: 'Early Bird', artist: 'Artist D' },
            { icon: '🎵', title: 'Morning Coffee', artist: 'Artist E' },
            { icon: '🎵', title: 'Bright Beginnings', artist: 'Artist F' },
            { icon: '🎵', title: 'Dawn Chorus', artist: 'Artist G' },
            { icon: '🎵', title: 'First Light', artist: 'Artist H' },
            { icon: '🎵', title: 'Morning Mist', artist: 'Artist I' },
            { icon: '🎵', title: 'Sunlit Smiles', artist: 'Artist J' },
            { icon: '🎵', title: 'Gentle Awakening', artist: 'Artist K' },
            { icon: '🎵', title: 'Rise and Shine', artist: 'Artist L' },
            { icon: '🎵', title: 'Fresh Start', artist: 'Artist M' },
            { icon: '🎵', title: 'Morning Breeze', artist: 'Artist N' },
            { icon: '🎵', title: 'Golden Hour', artist: 'Artist O' },
            { icon: '🎵', title: 'Daybreak Dance', artist: 'Artist P' },
            { icon: '🎵', title: 'Sunrise Serenade', artist: 'Artist Q' },
            { icon: '🎵', title: 'New Day', artist: 'Artist R' },
            { icon: '🎵', title: 'Awake', artist: 'Artist S' },
            { icon: '🎵', title: 'Morning Magic', artist: 'Artist T' }
        ]
    },
    '11:00 - 13:00': {
        name: 'Midday Playlist',
        songs: [
            { icon: '🎵', title: 'Midday Beats', artist: 'Artist C' },
            { icon: '🎵', title: 'Lunch Break', artist: 'Artist D' },
            { icon: '🎵', title: 'Noon Vibes', artist: 'Artist F' },
            { icon: '🎵', title: 'Sunny Afternoon', artist: 'Artist G' },
            { icon: '🎵', title: 'Daylight Dance', artist: 'Artist H' },
            { icon: '🎵', title: 'Bright and Breezy', artist: 'Artist I' },
            { icon: '🎵', title: 'Daytime Dream', artist: 'Artist J' },
            { icon: '🎵', title: 'High Noon', artist: 'Artist K' },
            { icon: '🎵', title: 'Afternoon Jazz', artist: 'Artist L' },
            { icon: '🎵', title: 'Sunshine Soul', artist: 'Artist M' },
            { icon: '🎵', title: 'Midday Mix', artist: 'Artist N' },
            { icon: '🎵', title: 'Summer Noon', artist: 'Artist O' },
            { icon: '🎵', title: 'Heatwave Harmony', artist: 'Artist P' },
            { icon: '🎵', title: 'Light and Lively', artist: 'Artist Q' },
            { icon: '🎵', title: 'Sunlit Groove', artist: 'Artist R' },
            { icon: '🎵', title: 'Golden Afternoon', artist: 'Artist S' },
            { icon: '🎵', title: 'Noon Delight', artist: 'Artist T' },
            { icon: '🎵', title: 'Warm and Bright', artist: 'Artist U' },
            { icon: '🎵', title: 'High Spirits', artist: 'Artist V' },
            { icon: '🎵', title: 'Daytime Dreams', artist: 'Artist W' }
        ]
    },
    '13:00 - 15:00': {
        name: 'Afternoon Playlist',
        songs: [
            { icon: '🎵', title: 'Afternoon Groove', artist: 'Artist E' },
            { icon: '🎵', title: 'Chill Out', artist: 'Artist F' },
            { icon: '🎵', title: 'Lazy Afternoon', artist: 'Artist I' },
            { icon: '🎵', title: 'Relaxing Tunes', artist: 'Artist J' },
            { icon: '🎵', title: 'Afternoon Delight', artist: 'Artist K' },
            { icon: '🎵', title: 'Soft Shadows', artist: 'Artist L' },
            { icon: '🎵', title: 'Quiet Moments', artist: 'Artist M' },
            { icon: '🎵', title: 'Gentle Groove', artist: 'Artist N' },
            { icon: '🎵', title: 'Reflective Beats', artist: 'Artist O' },
            { icon: '🎵', title: 'Leisure Time', artist: 'Artist P' },
            { icon: '🎵', title: 'Calm and Collected', artist: 'Artist Q' },
            { icon: '🎵', title: 'Afternoon Sunshine', artist: 'Artist R' },
            { icon: '🎵', title: 'Sundown Serenade', artist: 'Artist S' },
            { icon: '🎵', title: 'Late Lunch', artist: 'Artist T' },
            { icon: '🎵', title: 'Easy Going', artist: 'Artist U' },
            { icon: '🎵', title: 'Golden Hours', artist: 'Artist V' },
            { icon: '🎵', title: 'Warm Waves', artist: 'Artist W' },
            { icon: '🎵', title: 'Restful Rhapsody', artist: 'Artist X' },
            { icon: '🎵', title: 'Peaceful Afternoon', artist: 'Artist Y' },
            { icon: '🎵', title: 'Calm Mind', artist: 'Artist Z' }
        ]
    },
    '15:00 - 17:00': {
        name: 'Evening Playlist',
        songs: [
            { icon: '🎵', title: 'Sunset Serenade', artist: 'Artist G' },
            { icon: '🎵', title: 'Twilight Tune', artist: 'Artist H' },
            { icon: '🎵', title: 'Evening Calm', artist: 'Artist L' },
            { icon: '🎵', title: 'Dusk Melody', artist: 'Artist M' },
            { icon: '🎵', title: 'Nightfall Notes', artist: 'Artist N' },
            { icon: '🎵', title: 'Moonlit Mood', artist: 'Artist O' },
            { icon: '🎵', title: 'Evening Echoes', artist: 'Artist P' },
            { icon: '🎵', title: 'Stars Above', artist: 'Artist Q' },
            { icon: '🎵', title: 'Cool Twilight', artist: 'Artist R' },
            { icon: '🎵', title: 'Reflective Night', artist: 'Artist S' },
            { icon: '🎵', title: 'Dreamscape', artist: 'Artist T' },
            { icon: '🎵', title: 'Quiet Stars', artist: 'Artist U' },
            { icon: '🎵', title: 'Evening Breeze', artist: 'Artist V' },
            { icon: '🎵', title: 'Moonrise Harmony', artist: 'Artist W' },
            { icon: '🎵', title: 'Gentle Night', artist: 'Artist X' },
            { icon: '🎵', title: 'Dusk Dreams', artist: 'Artist Y' },
            { icon: '🎵', title: 'Nightfall Bliss', artist: 'Artist Z' },
            { icon: '🎵', title: 'Evening Glow', artist: 'Artist AA' },
            { icon: '🎵', title: 'Peaceful Night', artist: 'Artist AB' },
            { icon: '🎵', title: 'Silent Stars', artist: 'Artist AC' }
        ]
    }
};

function updatePlaylistForm() {
    const selectedTimeSlot = timeSlotSelect.value;
    if (selectedTimeSlot && timeSlotPlaylists[selectedTimeSlot]) {
        const playlist = timeSlotPlaylists[selectedTimeSlot];
        playlistNameInput.value = playlist.name;

        // Clear existing playlist entries
        playlistTableBody.innerHTML = '';

        // Populate playlist table with songs
        playlist.songs.forEach((song, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${song.icon}</td>
                    <td>${song.title}</td>
                    <td>${song.artist}</td>
                    <td><button type="button" class="add-btn" data-index="${index}">+</button></td>
                `;
            playlistTableBody.appendChild(row);
        });

        // Attach event listeners to the add buttons
        const addButtons = document.querySelectorAll('.add-btn');
        addButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                const song = playlist.songs[index];
                addSongToMyPlaylist(song);
            });
        });
    } else {
        // Clear form if no valid time slot is selected
        playlistNameInput.value = '';
        playlistTableBody.innerHTML = '';
    }
}

function addSongToMyPlaylist(song) {
    let myPlaylist = JSON.parse(localStorage.getItem('myPlaylist')) || [];
    myPlaylist.push(song);
    localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
    alert(`Added "${song.title}" by ${song.artist} to your playlist.`);




}

// Event listener for time slot selection
timeSlotSelect.addEventListener('change', updatePlaylistForm);

document.addEventListener('DOMContentLoaded', function () {
    const playlistForm = document.getElementById('playlistForm');

    playlistForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Retrieve form input values
        const playlistName = document.getElementById('playlistName').value;
        const timeSlot = document.getElementById('timeSlotSelect').value;
        // Add other form fields as needed

        // Perform validation
        if (!playlistName || !timeSlot) {
            alert('Please fill in all required fields.');
            return;
        }

        // Create data object to send
        const formData = {
            playlistName: playlistName,
            timeSlot: timeSlot,
            // Add other form data as needed
        };

        // Send data to the server (example using fetch)
        fetch('/submitPlaylist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Handle success response
                console.log('Success:', data);
                alert('Playlist submitted successfully!');
            })
            .catch(function (error) {
                // Handle error response
                console.error('Error:', error);
                alert('An error occurred while submitting the playlist.');
            });
    });
});

// Add event listener for keydown events on the document
document.addEventListener('keydown', function (event) {
    // Get the key that was pressed
    const key = event.key;

    // Perform actions based on the key pressed
    console.log('Key pressed:', key);

    // Example: If 'Enter' key is pressed, submit the form
    if (key === 'Enter') {
        event.preventDefault(); // Prevent default 'Enter' key behavior
        const playlistForm = document.getElementById('playlistForm');
        if (playlistForm) {
            playlistForm.submit();
        }
    }

    // Example: If 'Escape' key is pressed, reset the form
    if (key === 'Escape') {
        const playlistForm = document.getElementById('playlistForm');
        if (playlistForm) {
            playlistForm.reset();
        }
    }

    // Add other key handling as needed
});
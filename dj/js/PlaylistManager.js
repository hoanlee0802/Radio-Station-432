export class PlaylistManager {
    constructor() {
        this.prevPlaying = null;
        this.init();
    }

    init() {
        // Add event listeners for playlist buttons
        const buttons = document.querySelectorAll(".playlist button");
        buttons.forEach(button => {
            button.addEventListener("click", () => this.addToPlaylist(button));
        });

        // Form validation
        const form = document.querySelector("form");
        if (form) {
            form.addEventListener("submit", (e) => this.validateForm(e));
        }

        // Window resize event
        window.addEventListener("resize", () => this.handleResize());

        // Hover effects on playlist items
        const playlistItems = document.querySelectorAll(".playlist li");
        playlistItems.forEach(item => {
            item.addEventListener("mouseover", () => this.highlightItem(item));
            item.addEventListener("mouseout", () => this.unhighlightItem(item));
        });
    }

    addToPlaylist(button) {
        alert("Added to playlist!");
        // Manipulate style through properties
        button.style.backgroundColor = "#4CAF50";
        button.style.color = "white";
    }

    validateForm(e) {
        const input = e.target.querySelector("input[name='song']");
        if (!input.value) {
            e.preventDefault();
            alert("Please enter a song name.");
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    }

    handleResize() {
        const width = window.innerWidth;
        const body = document.body;
        if (width < 600) {
            body.style.backgroundColor = "#f0f0f0";
        } else {
            body.style.backgroundColor = "";
        }
    }

    highlightItem(item) {
        item.classList.add("highlight");
    }

    unhighlightItem(item) {
        item.classList.remove("highlight");
    }
}

export const PlaylistManager = {
    getMyPlaylist: function() {
        return JSON.parse(localStorage.getItem('myPlaylist')) || [];
    },

    addSongToMyPlaylist: function(song) {
        let myPlaylist = this.getMyPlaylist();
        myPlaylist.push(song);
        localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
    },

    removeSongFromMyPlaylist: function(index) {
        let myPlaylist = this.getMyPlaylist();
        myPlaylist.splice(index, 1);
        localStorage.setItem('myPlaylist', JSON.stringify(myPlaylist));
    },

    getPreviousPlaylists: function() {
        return JSON.parse(localStorage.getItem('previousPlaylists')) || [];
    },

    saveCurrentPlaylist: function(name) {
        let myPlaylist = this.getMyPlaylist();
        let previousPlaylists = this.getPreviousPlaylists();

        const playlist = {
            name: name,
            date: new Date().toLocaleDateString(),
            songs: myPlaylist
        };

        previousPlaylists.push(playlist);
        localStorage.setItem('previousPlaylists', JSON.stringify(previousPlaylists));

        // Clear current playlist
        localStorage.removeItem('myPlaylist');
    },

    // Other playlist functions...
};
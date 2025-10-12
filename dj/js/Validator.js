export function validateSong(input) {
    if (!input.value) {
        alert("Song name cannot be empty.");
        input.style.borderColor = "red";
        input.style.borderWidth = "2px";
    } else {
        input.style.borderColor = "";
        input.style.borderWidth = "";
    }
}
document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners for buttons in the playlist
    const buttons = document.querySelectorAll(".playlist button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Added to playlist!");
        });
    });
});

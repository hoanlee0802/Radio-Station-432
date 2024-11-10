// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".core-form");
  const dateInput = document.getElementById("date");
  const timeslotInput = document.getElementById("timeslot");
  const djInput = document.getElementById("dj");
  const messagesDiv = document.getElementById("validation-messages");
  const highlightButton = document.getElementById("highlight-btn");

  // Form validation feedback
  form.addEventListener("submit", (e) => {
    let messages = [];
    if (!dateInput.value) {
      messages.push("Date is required.");
    }
    if (djInput.value.length < 3) {
      messages.push("DJ name must be at least 3 characters long.");
    }

    if (messages.length > 0) {
      e.preventDefault();
      messagesDiv.innerHTML = messages.map((msg) => `<p>${msg}</p>`).join("");
      messagesDiv.style.color = "red";
    } else {
      messagesDiv.innerHTML = ""; // Clear messages on successful submission
    }
  });

  // Style manipulation on button click
  highlightButton.addEventListener("click", () => {
    document.querySelectorAll(".core-table tbody tr").forEach((row, index) => {
      if (index % 2 === 0) {
        row.style.backgroundColor = "#d3f9d8";
      } else {
        row.style.backgroundColor = "#fff";
      }
    });
  });

  // Demonstrating class usage
  class DJAssignment {
    constructor(date, timeslot, dj) {
      this.date = date;
      this.timeslot = timeslot;
      this.dj = dj;
    }

    displayAssignment() {
      console.log(`DJ ${this.dj} assigned to ${this.timeslot} on ${this.date}`);
    }
  }

  // Creating a custom object for property demonstration
  let radioHost = {
    name: "Alex",
    showName: "Morning Melodies",
    yearsExperience: 5,
  };
  console.log(`Initial years of experience: ${radioHost.yearsExperience}`);
  radioHost.yearsExperience = 6; // Modifying property
  radioHost.timeSlot = "8am - 10am"; // Adding new property
  console.log(`Updated radio host:`, radioHost);

  // Capture form submission and display assignment details
  form.addEventListener("submit", (e) => {
    if (messagesDiv.innerHTML === "") {
      // Proceed only if there are no validation errors
      const assignment = new DJAssignment(
        dateInput.value,
        timeslotInput.value,
        djInput.value
      );
      assignment.displayAssignment();
      alert(
        `Assignment confirmed: DJ ${assignment.dj} assigned to ${assignment.timeslot} on ${assignment.date}`
      );
    }
  });

  // Demonstrating window object usage with setTimeout
  setTimeout(() => {
    console.log("This message is shown after 3 seconds");
  }, 3000);
});

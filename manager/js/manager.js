document.addEventListener("DOMContentLoaded", () => {
  const addDJForm = document.getElementById("add-dj-form");
  const scheduleDJForm = document.getElementById("schedule-dj-form");
  const djList = document.getElementById("dj-list");
  const selectDJ = document.getElementById("select-dj");
  const scheduleTable = document.querySelector("#schedule-table tbody");

  const timeSlots = [
    "6:00 AM - 8:00 AM",
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Fetch all DJs from the server
  const fetchDJs = async () => {
    try {
      const res = await fetch("/manager/djs");
      const djs = await res.json();
      populateDJList(djs);
      populateSelectDJ(djs);
    } catch (error) {
      console.error(error);
    }
  };

  // Populate the DJ list
  const populateDJList = (djs) => {
    djList.innerHTML = "";
    djs.forEach((dj) => {
      const li = document.createElement("li");
      li.textContent = dj.name; // Display the DJ's name
      djList.appendChild(li);
    });
  };

  // Populate the select dropdown with DJ names for scheduling
  const populateSelectDJ = (djs) => {
    selectDJ.innerHTML = "";
    djs.forEach((dj) => {
      const option = document.createElement("option");
      option.value = dj._id; // Store the DJ's unique ID
      option.textContent = dj.name; // Display the DJ's name
      selectDJ.appendChild(option);
    });
  };

  // Fetch and display the schedule
  const fetchSchedule = async () => {
    try {
      const response = await fetch("/manager/schedule");
      const schedule = await response.json();
      console.log("Fetched schedule:", schedule); // Log the fetched schedule
      populateSchedule(schedule); // Populate the schedule table
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  // Delete timeslot
  async function deleteTimeslot(djName, timeSlot, dayOfWeek) {
    console.log("Sending DELETE request:", { djName, timeSlot, dayOfWeek });

    const response = await fetch("/manager/schedule", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ djName, timeSlot, dayOfWeek }),
    });

    const result = await response.json();
    console.log("DELETE response:", result); // Log response

    if (response.ok) {
      alert(result.message);
      fetchSchedule(); // Refresh the schedule
    } else {
      alert(`Error: ${result.message}`);
    }
  }

  // Render the schedule with update and delete buttons
  function populateSchedule(schedule) {
    const scheduleTable = document.getElementById("schedule-table");
    scheduleTable.innerHTML = ""; // Clear the table

    // Create the header row with days of the week
    const headerRow = document.createElement("tr");
    const timeSlotHeader = document.createElement("th");
    timeSlotHeader.textContent = "Time Slot"; // Column header for time slots
    headerRow.appendChild(timeSlotHeader);

    // Add days of the week as column headers
    daysOfWeek.forEach((day) => {
      const dayHeader = document.createElement("th");
      dayHeader.textContent = day; // Day name
      headerRow.appendChild(dayHeader);
    });

    scheduleTable.appendChild(headerRow); // Add the header row to the table

    // Loop through each time slot (6 AM to 8 PM in 2-hour intervals)
    timeSlots.forEach((timeSlot) => {
      const row = document.createElement("tr");

      // Create the time slot cell
      const timeCell = document.createElement("td");
      timeCell.textContent = timeSlot;
      row.appendChild(timeCell);

      // Create a cell for each day of the week
      daysOfWeek.forEach((day) => {
        const cell = document.createElement("td");

        // Find the DJ scheduled for this timeslot on the given day
        const dj = schedule.find(
          (item) => item.dayOfWeek === day && item.timeSlot === timeSlot
        );

        if (dj) {
          // Access the djName directly (since that's what your data contains)
          const djName = dj.djName || "No DJ"; // Use djName, or fallback to "No DJ" if undefined

          const cellContent = document.createElement("div");

          // Create the Delete button
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.onclick = () => deleteTimeslot(dj.djName, timeSlot, day); // Update with djName as identifier

          // Append the DJ's name, update, and delete buttons
          cellContent.appendChild(document.createTextNode(djName));
          cellContent.appendChild(deleteBtn);
          cell.appendChild(cellContent);
        }

        row.appendChild(cell); // Append the cell to the row
      });

      scheduleTable.appendChild(row); // Add the row to the table
    });
  }

  document.addEventListener("DOMContentLoaded", fetchSchedule);

  // Handle the addition of a new DJ
  addDJForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = event.target["name"].value;
    await fetch("/manager/djs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    fetchDJs(); // Refresh the DJ list
  });

  // Populate time slots when the day is selected
  const dayOfWeekSelect = document.getElementById("day-of-week");
  const timeSlotSelect = document.getElementById("time-slot");

  dayOfWeekSelect.addEventListener("change", () => {
    const selectedDay = dayOfWeekSelect.value;

    timeSlotSelect.innerHTML = "<option value=''>Select Time Slot</option>";
    if (selectedDay) {
      timeSlots.forEach((slot) => {
        const option = document.createElement("option");
        option.value = slot;
        option.textContent = slot;
        timeSlotSelect.appendChild(option);
      });
    }
  });

  // Handle scheduling a DJ
  scheduleDJForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const djID = selectDJ.value; // DJ ID
    const dayOfWeek = event.target["day-of-week"].value; // Selected day
    const timeSlot = event.target["time-slot"].value; // Selected time slot

    if (!dayOfWeek || !timeSlot) {
      alert("Please select both a day and a time slot.");
      return;
    }

    // Send schedule data to the server
    try {
      const response = await fetch("/manager/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ djID, timeSlot, dayOfWeek }),
      });

      if (response.ok) {
        alert("Schedule updated successfully!");
        fetchSchedule(); // Refresh the schedule
      } else {
        const errorText = await response.text();
        console.error("Error updating schedule:", errorText);
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
  });

  // Initial fetch of DJs and schedule
  fetchDJs();
  fetchSchedule();
});

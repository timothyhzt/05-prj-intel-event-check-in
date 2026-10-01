const checkInForm = document.getElementById("checkInForm");
const attendeeName = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

let totalAttendees = 0;
const maximumAttendees = 50;

checkInForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (totalAttendees >= maximumAttendees) {
    greeting.textContent = "Check-in is full. Thank you for your interest!";
    greeting.className = "success-message";
    greeting.style.display = "block";
    return;
  }

  const name = attendeeName.value.trim();
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;
  const teamCount = document.getElementById(`${teamSelect.value}Count`);

  totalAttendees += 1;
  teamCount.textContent = Number(teamCount.textContent) + 1;
  attendeeCount.textContent = totalAttendees;
  progressBar.style.width = `${(totalAttendees / maximumAttendees) * 100}%`;

  greeting.textContent = `Welcome, ${name}! You are checked in with ${teamName}.`;
  greeting.className = "success-message";
  greeting.style.display = "block";

  checkInForm.reset();
});

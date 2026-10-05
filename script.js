const checkInForm = document.getElementById("checkInForm");
const attendeeName = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const attendeeList = document.getElementById("attendeeList");
const celebration = document.getElementById("celebration");

const maximumAttendees = 50;
const storageKey = "sustainabilitySummitAttendees";
let attendees = loadAttendees();

function loadAttendees() {
  const savedAttendees = localStorage.getItem(storageKey);

  if (savedAttendees === null) {
    return [];
  }

  try {
    const parsedAttendees = JSON.parse(savedAttendees);

    if (Array.isArray(parsedAttendees)) {
      return parsedAttendees;
    }
  } catch (error) {
    greeting.textContent = "Saved attendee data could not be loaded.";
    greeting.className = "error-message";
    greeting.style.display = "block";
  }

  return [];
}

function updateAttendanceDisplay() {
  const teamCounts = {
    water: 0,
    zero: 0,
    power: 0,
  };
  const teamNames = {
    water: "🌊 Team Water Wise",
    zero: "🌿 Team Net Zero",
    power: "⚡ Team Renewables",
  };
  const teamAttendees = {
    water: [],
    zero: [],
    power: [],
  };

  attendeeList.innerHTML = "";

  attendees.forEach(function (attendee) {
    if (teamCounts[attendee.team] !== undefined) {
      teamCounts[attendee.team] += 1;
      teamAttendees[attendee.team].push(attendee);
    }
  });

  Object.keys(teamNames).forEach(function (team) {
    const teamSection = document.createElement("div");
    teamSection.className = `attendee-team ${team}`;

    const teamHeading = document.createElement("h4");
    teamHeading.textContent = `${teamNames[team]} (${teamCounts[team]})`;
    teamSection.appendChild(teamHeading);

    const teamList = document.createElement("ul");

    teamAttendees[team].forEach(function (attendee) {
      const listItem = document.createElement("li");
      listItem.textContent = attendee.name;
      teamList.appendChild(listItem);
    });

    teamSection.appendChild(teamList);
    attendeeList.appendChild(teamSection);
  });

  document.getElementById("waterCount").textContent = teamCounts.water;
  document.getElementById("zeroCount").textContent = teamCounts.zero;
  document.getElementById("powerCount").textContent = teamCounts.power;
  attendeeCount.textContent = attendees.length;
  progressBar.style.width = `${(attendees.length / maximumAttendees) * 100}%`;
  updateTeamCelebration(teamCounts);
}

function updateTeamCelebration(teamCounts) {
  const teamCards = document.querySelectorAll(".team-card");
  let highestTeamCount = 0;
  const winningTeams = [];

  teamCards.forEach(function (teamCard) {
    const team = teamCard.dataset.team;
    teamCard.classList.remove("winner");

    if (teamCounts[team] > highestTeamCount) {
      highestTeamCount = teamCounts[team];
    }
  });

  teamCards.forEach(function (teamCard) {
    const team = teamCard.dataset.team;

    if (
      attendees.length === maximumAttendees &&
      teamCounts[team] === highestTeamCount
    ) {
      teamCard.classList.add("winner");
      winningTeams.push(teamCard.querySelector(".team-name").textContent);
    }
  });

  if (winningTeams.length === 1) {
    celebration.textContent = `🎉 ${winningTeams[0]} wins with ${highestTeamCount} attendees! 🎉`;
    celebration.classList.add("celebration-visible");
  } else if (winningTeams.length > 1) {
    celebration.textContent = `🎉 ${winningTeams.join(
      " and "
    )} share the win with ${highestTeamCount} attendees each! 🎉`;
    celebration.classList.add("celebration-visible");
  } else {
    celebration.textContent = "";
    celebration.classList.remove("celebration-visible");
  }
}

checkInForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (attendees.length >= maximumAttendees) {
    greeting.textContent = "Check-in is full. Thank you for your interest!";
    greeting.className = "success-message";
    greeting.style.display = "block";
    return;
  }

  const name = attendeeName.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;
  const newAttendee = {
    name: name,
    team: team,
    teamName: teamName,
  };

  attendees.push(newAttendee);

  try {
    localStorage.setItem(storageKey, JSON.stringify(attendees));
  } catch (error) {
    attendees.pop();
    greeting.textContent = "Your check-in could not be saved. Please try again.";
    greeting.className = "error-message";
    greeting.style.display = "block";
    return;
  }

  updateAttendanceDisplay();
  greeting.textContent = `Welcome, ${name}! You are checked in with ${teamName}.`;
  greeting.className = "success-message";
  greeting.style.display = "block";

  checkInForm.reset();
});

updateAttendanceDisplay();

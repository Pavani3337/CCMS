let clubs = JSON.parse(localStorage.getItem("clubs")) || [];
let students = JSON.parse(localStorage.getItem("students")) || [];
let events = JSON.parse(localStorage.getItem("events")) || [];

function save() {
  localStorage.setItem("clubs", JSON.stringify(clubs));
  localStorage.setItem("students", JSON.stringify(students));
  localStorage.setItem("events", JSON.stringify(events));
  refreshUI();
}

// ---------------- CLUB ----------------
function createClub() {
  let name = document.getElementById("clubName").value;
  if (!name) return alert("Enter club name");

  clubs.push({ id: Date.now(), name });
  save();
}

// ---------------- STUDENT ----------------
function addStudent() {
  let name = document.getElementById("studentName").value;
  let clubId = document.getElementById("clubSelect").value;

  if (!name) return alert("Enter student name");

  students.push({
    id: Date.now(),
    name,
    clubId,
    points: 0
  });

  save();
}

// ---------------- EVENT ----------------
function createEvent() {
  let name = document.getElementById("eventName").value;
  let clubId = document.getElementById("eventClubSelect").value;

  if (!name) return alert("Enter event name");

  events.push({
    id: Date.now(),
    name,
    clubId,
    attendees: []
  });

  save();
}

// ---------------- ATTENDANCE ----------------
function markAttendance() {
  let eventId = document.getElementById("eventSelect").value;
  let studentId = document.getElementById("studentSelect").value;

  let event = events.find(e => e.id == eventId);
  let student = students.find(s => s.id == studentId);

  if (!event || !student) return;

  if (!event.attendees.includes(studentId)) {
    event.attendees.push(studentId);
    student.points += 10;
  }

  save();
}

// ---------------- UI ----------------
function refreshUI() {

  let board = document.getElementById("board");
  board.innerHTML = "";

  // GROUP DATA BY CLUB (IMPORTANT FIX)
  clubs.forEach(club => {

    let clubStudents = students.filter(s => s.clubId == club.id);
    let clubEvents = events.filter(e => e.clubId == club.id);

    board.innerHTML += `
      <div class="row" style="background:#dff0ff">
        <h3>🏢 ${club.name}</h3>

        <p>👥 Members:</p>
        <ul>
          ${clubStudents.map(s => `<li>${s.name} ⭐ ${s.points}</li>`).join("") || "<li>No members</li>"}
        </ul>

        <p>📅 Events:</p>
        <ul>
          ${clubEvents.map(e => `<li>${e.name} (${e.attendees.length} attended)</li>`).join("") || "<li>No events</li>"}
        </ul>
      </div>
    `;
  });

  // dropdown fix
  document.getElementById("clubSelect").innerHTML =
  document.getElementById("eventClubSelect").innerHTML =
  clubs.map(c => `<option value="${c.id}">${c.name}</option>`).join("");

  document.getElementById("eventSelect").innerHTML =
  events.map(e => `<option value="${e.id}">${e.name}</option>`).join("");

  document.getElementById("studentSelect").innerHTML =
  students.map(s => `<option value="${s.id}">${s.name}</option>`).join("");
}

refreshUI();
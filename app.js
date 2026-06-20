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

  // clubs dropdown
  let clubSelect = document.getElementById("clubSelect");
  let eventClubSelect = document.getElementById("eventClubSelect");

  clubSelect.innerHTML = "";
  eventClubSelect.innerHTML = "";

  clubs.forEach(c => {
    clubSelect.innerHTML += `<option value="${c.id}">${c.name}</option>`;
    eventClubSelect.innerHTML += `<option value="${c.id}">${c.name}</option>`;
  });

  // events dropdown
  let eventSelect = document.getElementById("eventSelect");
  eventSelect.innerHTML = "";
  events.forEach(e => {
    eventSelect.innerHTML += `<option value="${e.id}">${e.name}</option>`;
  });

  // students dropdown
  let studentSelect = document.getElementById("studentSelect");
  studentSelect.innerHTML = "";
  students.forEach(s => {
    studentSelect.innerHTML += `<option value="${s.id}">${s.name}</option>`;
  });

  // leaderboard
  let board = document.getElementById("board");
  board.innerHTML = "";

  let sorted = [...students].sort((a,b) => b.points - a.points);

  sorted.forEach(s => {
    let club = clubs.find(c => c.id == s.clubId);
    board.innerHTML += `
      <div class="row">
        🧑 ${s.name} | 🏢 ${club ? club.name : "No Club"} | ⭐ ${s.points}
      </div>
    `;
  });
}

refreshUI();
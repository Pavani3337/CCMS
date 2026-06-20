// ---------------- STORAGE ----------------
let clubs = JSON.parse(localStorage.getItem("clubs")) || [];
let events = JSON.parse(localStorage.getItem("events")) || [];

// Save data
function saveData() {
  localStorage.setItem("clubs", JSON.stringify(clubs));
  localStorage.setItem("events", JSON.stringify(events));
}

// ---------------- DASHBOARD ----------------
function updateDashboard() {
  document.getElementById("clubCount").innerText = clubs.length;
  document.getElementById("eventCount").innerText = events.length;
}

// ---------------- CLUBS ----------------
function addClub() {
  let name = document.getElementById("clubName").value;
  if (!name) return alert("Enter club name");

  clubs.push({ name: name });
  saveData();
  renderClubs();
}

function renderClubs() {
  let list = document.getElementById("clubList");
  if (!list) return;

  list.innerHTML = "";

  clubs.forEach((c, i) => {
    list.innerHTML += `
      <div class="item">
        🏢 ${c.name}
        <button onclick="deleteClub(${i})">Delete</button>
      </div>
    `;
  });
}

function deleteClub(i) {
  clubs.splice(i, 1);
  saveData();
  renderClubs();
}

// ---------------- EVENTS ----------------
function addEvent() {
  let name = document.getElementById("eventName").value;
  let date = document.getElementById("eventDate").value;

  if (!name || !date) return alert("Fill all fields");

  events.push({ name, date });
  saveData();
  renderEvents();
}

function renderEvents() {
  let list = document.getElementById("eventList");
  if (!list) return;

  list.innerHTML = "";

  events.forEach((e, i) => {
    list.innerHTML += `
      <div class="item">
        📅 ${e.name} - ${e.date}
        <button onclick="deleteEvent(${i})">Delete</button>
      </div>
    `;
  });
}

function deleteEvent(i) {
  events.splice(i, 1);
  saveData();
  renderEvents();
}
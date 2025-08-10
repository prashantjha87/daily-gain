let workouts = {
  "Monday": ["Bench Press", "Incline Dumbbell Press", "Chest Fly"],
  "Tuesday": ["Pull Ups", "Barbell Row", "Lat Pulldown"],
  "Wednesday": ["Overhead Press", "Lateral Raise", "Front Raise"],
  "Thursday": ["Bicep Curl", "Tricep Pushdown", "Hammer Curl"],
  "Friday": ["Squat", "Leg Press", "Leg Curl"]
};

function showRegister() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
}

function showLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("register-form").style.display = "none";
}

function registerUser() {
  let name = document.getElementById("register-name").value;
  let mobile = document.getElementById("register-mobile").value;
  let email = document.getElementById("register-email").value;
  let password = document.getElementById("register-password").value;

  if (!name || !mobile || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find(u => u.email === email)) {
    alert("Email already registered!");
    return;
  }

  users.push({ name, mobile, email, password, logs: {} });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! Please login.");
  showLogin();
}

function loginUser() {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", email);
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("app-section").style.display = "block";
    loadWorkout();
  } else {
    alert("Invalid email or password");
  }
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  document.getElementById("app-section").style.display = "none";
  document.getElementById("auth-section").style.display = "block";
}

function loadWorkout() {
  let day = document.getElementById("day-select").value;
  let container = document.getElementById("workout-container");
  container.innerHTML = "";

  workouts[day].forEach(exercise => {
    let div = document.createElement("div");
    div.className = "workout-item";
    div.innerHTML = `
      <strong>${exercise}</strong><br>
      Reps: <input type="number" id="${exercise}-reps" placeholder="Reps" />
      Weight: <input type="number" id="${exercise}-weight" placeholder="Weight (kg)" />
      <button onclick="saveWorkout('${day}', '${exercise}')">Save</button>
    `;
    container.appendChild(div);
  });
}

function saveWorkout(day, exercise) {
  let reps = document.getElementById(`${exercise}-reps`).value;
  let weight = document.getElementById(`${exercise}-weight`).value;

  if (!reps || !weight) {
    alert("Enter reps and weight");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let currentUser = localStorage.getItem("currentUser");
  let user = users.find(u => u.email === currentUser);

  if (!user.logs[day]) user.logs[day] = [];
  user.logs[day].push({ exercise, reps, weight, date: new Date().toLocaleDateString() });

  localStorage.setItem("users", JSON.stringify(users));
  alert(`Saved ${exercise} - ${reps} reps @ ${weight} kg`);
}

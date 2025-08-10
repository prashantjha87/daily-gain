let currentUser = null;

function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

function showLogin() {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

function registerUser() {
    const mobile = document.getElementById("register-mobile").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    if (!mobile || !email || !password) {
        alert("Please fill all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[email]) {
        alert("User already exists. Please login.");
        return;
    }

    users[email] = { mobile, password, workouts: [] };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please log in.");
    showLogin();
}

function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users") || "{}");

    if (!users[email] || users[email].password !== password) {
        alert("Invalid credentials.");
        return;
    }

    currentUser = email;
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("app-section").style.display = "block";
    loadWorkouts();
}

function logoutUser() {
    currentUser = null;
    document.getElementById("app-section").style.display = "none";
    document.getElementById("auth-section").style.display = "block";
}

function logWorkout() {
    const day = document.getElementById("workout-day").value;
    const reps = document.getElementById("reps").value;
    const weight = document.getElementById("weight").value;

    if (!day || !reps || !weight) {
        alert("Please enter all workout details.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "{}");
    let workoutEntry = {
        date: new Date().toLocaleDateString(),
        day,
        reps,
        weight
    };

    users[currentUser].workouts.push(workoutEntry);
    localStorage.setItem("users", JSON.stringify(users));
    loadWorkouts();
}

function loadWorkouts() {
    let users = JSON.parse(localStorage.getItem("users") || "{}");
    let workouts = users[currentUser]?.workouts || [];

    let tableBody = document.querySelector("#history-table tbody");
    tableBody.innerHTML = "";

    workouts.forEach(w => {
        let row = `<tr>
            <td>${w.date}</td>
            <td>${w.day}</td>
            <td>${w.reps}</td>
            <td>${w.weight}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

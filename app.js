document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("dailyGainUser");
    if (currentUser) {
        showApp(currentUser);
    } else {
        showLogin();
    }
});

function login() {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter your username");
        return;
    }
    localStorage.setItem("dailyGainUser", username);
    localStorage.setItem(`tasks_${username}`, JSON.stringify([]));
    showApp(username);
}

function logout() {
    localStorage.removeItem("dailyGainUser");
    showLogin();
}

function showLogin() {
    document.getElementById("login-screen").classList.remove("hidden");
    document.getElementById("app-screen").classList.add("hidden");
}

function showApp(username) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("app-screen").classList.remove("hidden");
    document.getElementById("user-display").textContent = username;
    loadTasks(username);
}

function saveTask() {
    const username = localStorage.getItem("dailyGainUser");
    const taskInput = document.getElementById("task");
    const task = taskInput.value.trim();
    if (!task) return;

    let tasks = JSON.parse(localStorage.getItem(`tasks_${username}`)) || [];
    tasks.push(task);
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));

    taskInput.value = "";
    loadTasks(username);
}

function loadTasks(username) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem(`tasks_${username}`)) || [];

    tasks.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        taskList.appendChild(li);
    });
}

// Register Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(() => {
        console.log("Service Worker Registered");
    });
}

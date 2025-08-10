document.getElementById('add-btn').addEventListener('click', function () {
    const day = document.getElementById('day').value;
    const exercise = document.getElementById('exercise').value;
    const weight = document.getElementById('weight').value;
    const reps = document.getElementById('reps').value;
    const date = new Date().toLocaleDateString();

    if (!exercise || !weight || !reps) {
        alert('Please fill in all fields!');
        return;
    }

    const workout = { day, exercise, weight, reps, date };
    let logs = JSON.parse(localStorage.getItem('workouts')) || [];
    logs.push(workout);
    localStorage.setItem('workouts', JSON.stringify(logs));

    renderLog();
    document.getElementById('exercise').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('reps').value = '';
});

function renderLog() {
    const logBody = document.getElementById('log-body');
    logBody.innerHTML = '';
    let logs = JSON.parse(localStorage.getItem('workouts')) || [];
    logs.forEach(log => {
        const row = `<tr>
            <td>${log.day}</td>
            <td>${log.exercise}</td>
            <td>${log.weight}</td>
            <td>${log.reps}</td>
            <td>${log.date}</td>
        </tr>`;
        logBody.innerHTML += row;
    });
}

renderLog();

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
        console.log('Service Worker registered');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('workoutForm');
    const logContainer = document.getElementById('workoutLog');
    let workouts = JSON.parse(localStorage.getItem('broSplitWorkouts')) || [];

    function renderWorkouts() {
        logContainer.innerHTML = '';
        workouts.forEach((w, index) => {
            const div = document.createElement('div');
            div.className = 'log-item';
            div.innerHTML = `
                <strong>${w.day}</strong> - ${w.exercise} | ${w.reps} reps | ${w.weight} kg
                <br><small>${w.date}</small>
                <br><button onclick="deleteWorkout(${index})">Delete</button>
            `;
            logContainer.appendChild(div);
        });
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        const workout = {
            day: document.getElementById('day').value,
            exercise: document.getElementById('exercise').value,
            reps: document.getElementById('reps').value,
            weight: document.getElementById('weight').value,
            date: new Date().toLocaleString()
        };
        workouts.push(workout);
        localStorage.setItem('broSplitWorkouts', JSON.stringify(workouts));
        form.reset();
        renderWorkouts();
    });

    window.deleteWorkout = index => {
        workouts.splice(index, 1);
        localStorage.setItem('broSplitWorkouts', JSON.stringify(workouts));
        renderWorkouts();
    };

    renderWorkouts();
});

//pormodoro timer functions and code
let pomodoroMinutes = 25;
let shortBreakMinutes = 5;
let longBreakMinutes = 12;
let seconds = 0;
let timerInterval;
let timeRunning = false;
let selectedTimer;

function selectTimer(timer) {
    stopTimer(); // Stop the timer if it's running
    selectedTimer = timer;
    seconds = 0; // Reset the seconds counter
    updateDisplay();
}

function startTimer() {
    if (selectedTimer && !timeRunning) {
        timeRunning = true;
        switch (selectedTimer) {
            case 'pomodoro':
                timerInterval = setInterval(updatePomodoroTimer, 1000);
                break;
            case 'shortBreak':
                timerInterval = setInterval(updateShortBreakTimer, 1000);
                break;
            case 'longBreak':
                timerInterval = setInterval(updateLongBreakTimer, 1000);
                break;
        }
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timeRunning = false;
}

function resetTimer() {
    stopTimer();
    pomodoroMinutes = 25;
    shortBreakMinutes = 5;
    longBreakMinutes = 12;
    seconds = 0;
    updateDisplay();
}

function updatePomodoroTimer() {
    if (seconds > 0) {
        seconds--;
    } else if (pomodoroMinutes > 0) {
        pomodoroMinutes--;
        seconds = 59;
    } else {
        stopTimer();
        alert("Pomodoro session completed! Take a short break.");
        shortBreakMinutes = 5;
        seconds = 0;
        updateDisplay();
    }
    updateDisplay();
}

function updateShortBreakTimer() {
    if (seconds > 0) {
        seconds--;
    } else if (shortBreakMinutes > 0) {
        shortBreakMinutes--;
        seconds = 59;
    } else {
        stopTimer();
        alert("Short break time is over. Start your next Pomodoro session.");
        pomodoroMinutes = 25;
        seconds = 0;
        updateDisplay();
    }
    updateDisplay();
}

function updateLongBreakTimer() {
    if (seconds > 0) {
        seconds--;
    } else if (longBreakMinutes > 0) {
        longBreakMinutes--;
        seconds = 59;
    } else {
        stopTimer();
        alert("Long break time is over. Start your next Pomodoro session.");
        pomodoroMinutes = 25;
        seconds = 0;
        updateDisplay();
    }
    updateDisplay();
}

function updateDisplay() {
    let displayMinutes;
    switch (selectedTimer) {
        case 'pomodoro':
            displayMinutes = pomodoroMinutes < 10 ? "0" + pomodoroMinutes : pomodoroMinutes;
            break;
        case 'shortBreak':
            displayMinutes = shortBreakMinutes < 10 ? "0" + shortBreakMinutes : shortBreakMinutes;
            break;
        case 'longBreak':
            displayMinutes = longBreakMinutes < 10 ? "0" + longBreakMinutes : longBreakMinutes;
            break;
        default:
            displayMinutes = "00";
    }
    let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("timer").innerText = displayMinutes + ":" + displaySeconds;
}

var timerInterval;
var isWorkTime = true;
var currentSound = null; // To keep track of the current sound

function changeBackground(imageURL, soundURL) {
    document.body.style.backgroundImage = `url(${imageURL})`;
    playSound(soundURL);
}

function playSound(soundURL) {
    if (currentSound) {
        currentSound.pause();
        currentSound.currentTime = 0;
    }
    currentSound = new Audio(soundURL);
    currentSound.play();
}
    window.addEventListener('load', () => {
    loadTimerFromCookies();

    //task list code
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    
    // Load tasks from cookies when the page loads
    loadTasksFromCookies();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        const task_check_el = document.createElement('button');
        task_check_el.classList.add('check');//check button


        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_check_el);
        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');//div

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';//edit button

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = '✖';//delete button

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_content_el);
        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        // Save tasks to cookies when a new task is added
        saveTasksToCookies();

        input.value = '';
//functions of the button
        task_edit_el.onclick = function() {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                saveTasksToCookies();
            }
        };

        task_delete_el.onclick = function() {
            list_el.removeChild(task_el);
            // Save tasks to cookies when a task is deleted
            saveTasksToCookies();
        };

        task_check_el.onclick = function() {
            
            task_el.classList.toggle('completed');
        };
    });
//cookies function
    function saveTasksToCookies() {
        const tasks = Array.from(list_el.querySelectorAll('.text')).map(input => input.value);
        document.cookie = `tasks=${tasks.join('|')}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
    }

    
    function loadTasksFromCookies() {
        const cookies = document.cookie.split(';');
        const tasksCookie = cookies.find(cookie => cookie.trim().startsWith('tasks='));
        if (tasksCookie) {
            const tasksString = tasksCookie.split('=')[1];
            const tasks = tasksString.split('|');
            tasks.forEach(task => {
                const task_el = document.createElement('div');
                task_el.classList.add('task');

                const task_content_el = document.createElement('div');
                task_content_el.classList.add('content');

                const task_check_el = document.createElement('button');
                task_check_el.classList.add('check');
                

                const task_input_el = document.createElement('input');
                task_input_el.classList.add('text');
                task_input_el.type = 'text';
                task_input_el.value = task;
                task_input_el.setAttribute('readonly', 'readonly');

                task_content_el.appendChild(task_check_el);
                task_content_el.appendChild(task_input_el);

                const task_actions_el = document.createElement('div');
                task_actions_el.classList.add('actions');

                const task_edit_el = document.createElement('button');
                task_edit_el.classList.add('edit');
                task_edit_el.innerText = 'Edit';

                const task_delete_el = document.createElement('button');
                task_delete_el.classList.add('delete');
                task_delete_el.innerText = '✖';

                task_actions_el.appendChild(task_edit_el);
                task_actions_el.appendChild(task_delete_el);

                task_el.appendChild(task_content_el);
                task_el.appendChild(task_actions_el);

                list_el.appendChild(task_el);

                task_edit_el.onclick = function() {
                    if (task_edit_el.innerText.toLowerCase() == "edit") {
                        task_edit_el.innerText = "Save";
                        task_input_el.removeAttribute("readonly");
                        task_input_el.focus();
                    } else {
                        task_edit_el.innerText = "Edit";
                        task_input_el.setAttribute("readonly", "readonly");
                        saveTasksToCookies();
                    }
                };

                task_delete_el.onclick = function() {
                    list_el.removeChild(task_el);
                    saveTasksToCookies();
                };

                task_check_el.onclick = function() {
                    if (task_check_el.innerText === '✔') {
    task_check_el.innerText = '';
} else {
    task_check_el.innerText = '✔';
}
task_el.classList.toggle('completed');
                };
            });
        }
    }
});
function pormodoro() {
updateTimerButtons('pormodoro-button');
document.getElementById('work-minutes').innerText = '25';
document.getElementById('work-seconds').innerText = '00';
stopTimer();
}

function shortbreak() {
updateTimerButtons('short-button');
document.getElementById('work-minutes').innerText = '05';
document.getElementById('work-seconds').innerText = '00';
stopTimer();
}

function longbreak() {
updateTimerButtons('long-button');
document.getElementById('work-minutes').innerText = '15';
document.getElementById('work-seconds').innerText = '00';
stopTimer();
}

function updateTimerButtons(activeButtonId) {
const buttons = document.querySelectorAll('.timer-button');
buttons.forEach(button => {
    if (button.id === activeButtonId) {
        button.style.backgroundColor = 'white';
        button.style.color='black';
    } else {
        button.style.color='white';
        button.style.backgroundColor = ''; 
    }
});
}
    function toggleTimer() {
        var startButton = document.getElementById("start-button");
        var stopButton = document.getElementById("stop-button");

        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            startButton.style.display = "inline-block";
            stopButton.style.display = "none";
        } else {
            timerInterval = setInterval(countdown, 1000);
            startButton.style.display = "none";
            stopButton.style.display = "inline-block";
        }
    }

    function countdown() {
var minutesElement = document.getElementById("work-minutes");
var secondsElement = document.getElementById("work-seconds");
var startButton = document.getElementById("start-button");
var stopButton = document.getElementById("stop-button");

var minutes = parseInt(minutesElement.innerText);
var seconds = parseInt(secondsElement.innerText);

if (seconds === 0) {
    if (minutes === 0) {
        clearInterval(timerInterval);
        alert(isWorkTime ? "Work time is over! Take a break." : "Break time is over! Get back to work.");
        isWorkTime = !isWorkTime;
    
        switchToNextMode();
        return;
    } else {
        minutes--;
        seconds = 59;
    }
} else {
    seconds--;
}

minutesElement.innerText = minutes < 10 ? "0" + minutes : minutes;
secondsElement.innerText = seconds < 10 ? "0" + seconds : seconds;

saveTimerToCookies();
}

function switchToNextMode() {
var workMinutesElement = document.getElementById('work-minutes');
var workLabelElement = document.getElementById('work-label');

if (isWorkTime) {
    workLabelElement.innerText = "Break:";
    workMinutesElement.innerText = "05";
    updateTimerButtons('short-button'); // Update the style for Short break button
} else {
    workLabelElement.innerText = "Work:";
    workMinutesElement.innerText = "25";
    updateTimerButtons('pormodoro-button'); // Update the style for Pomodoro button
}
document.getElementById("work-seconds").innerText = "00";
isWorkTime = !isWorkTime;
stopTimer();
saveTimerToCookies();
}

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById("start-button").style.display = "inline-block";
        document.getElementById("stop-button").style.display = "none";
    }

    function skipTimer() {
var workMinutesElement = document.getElementById('work-minutes');
var workSecondsElement = document.getElementById('work-seconds');
var workLabelElement = document.getElementById('work-label');

if (isWorkTime) {
    workLabelElement.innerText = "Break:";
    workMinutesElement.innerText = "05";
    updateTimerButtons('short-button'); // Update the style for Short break button
} else {
    workLabelElement.innerText = "Work:";
    workMinutesElement.innerText = "25";
    updateTimerButtons('pormodoro-button'); // Update the style for Pomodoro button
}
workSecondsElement.innerText = "00";
isWorkTime = !isWorkTime;
stopTimer();
saveTimerToCookies();
}

    function saveTimerToCookies() {
        var minutes = document.getElementById("work-minutes").innerText;
        var seconds = document.getElementById("work-seconds").innerText;
        var timerState = isWorkTime ? "work" : "break";

        document.cookie = `timerState=${timerState}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
        document.cookie = `timerMinutes=${minutes}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
        document.cookie = `timerSeconds=${seconds}; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
        console.log('Timer saved to cookies:', { timerState, minutes, seconds });  // Log the saved timer
    }

    function loadTimerFromCookies() {
        var cookies = document.cookie.split("; ");
        var timerState = cookies.find(row => row.startsWith("timerState="))?.split("=")[1];
        var timerMinutes = cookies.find(row => row.startsWith("timerMinutes="))?.split("=")[1];
        var timerSeconds = cookies.find(row => row.startsWith("timerSeconds="))?.split("=")[1];

        if (timerState && timerMinutes && timerSeconds) {
            isWorkTime = timerState === "work";
            document.getElementById("work-minutes").innerText = timerMinutes;
            document.getElementById("work-seconds").innerText = timerSeconds;
            document.getElementById("work-label").innerText = isWorkTime ? "Work:" : "Break:";
            console.log('Timer loaded from cookies:', { timerState, timerMinutes, timerSeconds });  // Log the loaded timer
        } else {
            console.log('No timer data in cookies');  // Log if no timer data is found
        }
    }
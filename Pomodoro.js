let timer;
let studyMinutes = 25;
let breakMinutes = 5;
let minutes = studyMinutes;
let seconds = 0;
let isRunning = false;
let isBreak = false;

function updateDisplay() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                clearInterval(timer);
                isRunning = false;
                if (isBreak) {
                    alert('Break time is over. Get back to work!');
                } else {
                    alert('Pomodoro completed! Take a break.');
                }
                isBreak = !isBreak;
                if (isBreak) {
                    minutes = breakMinutes;
                } else {
                    minutes = studyMinutes;
                }
                seconds = 0;
                updateDisplay();
            } else {
                if (seconds === 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                updateDisplay();
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isBreak = false;
    minutes = studyMinutes;
    seconds = 0;
    updateDisplay();
}

function setCustomTimer() {
    const customStudyMinutes = parseInt(document.getElementById('studyMinutes').value);
    const customBreakMinutes = parseInt(document.getElementById('breakMinutes').value);
    if (!isNaN(customStudyMinutes) && customStudyMinutes > 0 && !isNaN(customBreakMinutes) && customBreakMinutes > 0) {
        studyMinutes = customStudyMinutes;
        breakMinutes = customBreakMinutes;
        resetTimer();
        alert(`Custom Pomodoro timer set for ${studyMinutes} minutes (study) and ${breakMinutes} minutes (break).`);
    } else {
        alert('Please enter valid durations for study and break sessions.');
    }
}

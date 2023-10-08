var taskArr = [];
//yash
const updateView = () => {
    const todoList = document.getElementById("todoList");
    const completedTasks = document.getElementById("completedTasks");

    todoList.innerHTML = "";
    completedTasks.innerHTML = "";

    taskArr.forEach((element, index) => {
        const newTask = document.createElement("li");
        newTask.textContent = element.task;
        newTask.className = element.isDone ? "completed" : "";
        
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = element.isDone;
        checkBox.addEventListener("change", () => toggleTaskStatus(index));

        newTask.appendChild(checkBox);

        if (element.isDone) {
            completedTasks.appendChild(newTask);
        } else {
            todoList.appendChild(newTask);
        }``
    });
};

const addTask = (isDone) => {
    const task = document.getElementById("task-input").value;
    if (task.trim() === "") return;

    taskArr.push({ task, isDone });
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();

    const taskInput = document.getElementById("task-input");
    taskInput.value = "";
};

const toggleTaskStatus = (index) => {
    taskArr[index].isDone = !taskArr[index].isDone;
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();
};

const clearCompletedTasks = () => {
    taskArr = taskArr.filter((task) => !task.isDone);
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();
};

document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
    if (savedTasks !== null) taskArr = [...savedTasks];
    updateView();
});

document.getElementById("task-submit-btn").addEventListener("click", () => addTask(false));

document.getElementById("task-clear-btn").addEventListener("click", () => {
    localStorage.clear();
    taskArr = [];
    updateView();
});

// Event listener for clearing all completed tasks
document.getElementById('clearCompletedButton').addEventListener('click', () => clearCompletedTasks())





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

    const customStudyMinutes = parseInt(document.getElementById('studyMinutes').value);
    const customBreakMinutes = parseInt(document.getElementById('breakMinutes').value);
    if (!isNaN(customStudyMinutes) && customStudyMinutes > 0 && !isNaN(customBreakMinutes) && customBreakMinutes > 0) {
        studyMinutes = customStudyMinutes;
        breakMinutes = customBreakMinutes;
        resetTimer();
    } 
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



document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

function myFunction(){
  console.log('asd');
}

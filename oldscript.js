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
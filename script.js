var taskArr = [];

const updateView = () => {

    const tasksList = document.getElementById("tasksList");

    var child = tasksList.lastChild;
    while(child) {
        tasksList.removeChild(child);
        child = tasksList.lastChild;
    }

    taskArr.forEach((Element, index) => {

        const newTask = document.createElement("div");
        newTask.setAttribute("class", "task-div");

        const taskText = document.createElement("div");
        taskText.setAttribute("class", Element.isDone ? "task-text task-completed" : "task-text");
        taskText.innerHTML = (index + 1) + ". " + Element.task;

        const taskControls = document.createElement("div");
        taskControls.setAttribute("class", "task-controls");

        const taskEdit = document.createElement("button");
        taskEdit.innerHTML = "Edit";
        taskEdit.setAttribute("id", index + "edit");
        taskEdit.setAttribute("class", "task-btn task-btn-edit");
        taskEdit.addEventListener("click", (event) => editTask(event.target.id));

        const taskDelete = document.createElement("button");
        taskDelete.innerHTML = "Delete";
        taskDelete.setAttribute("id", index + "delete");
        taskDelete.setAttribute("class", "task-btn task-btn-delete");
        taskDelete.addEventListener("click", (event) => deleteTask(event.target.id));

        const taskDo = document.createElement("button");
        taskDo.innerHTML = Element.isDone ? "Undo" : "Done";
        taskDo.setAttribute("id", index + "do");
        taskDo.setAttribute("class", "task-btn task-btn-do");
        taskDo.addEventListener("click", (event) => doTask(event.target.id));

        taskControls.appendChild(taskEdit);
        taskControls.appendChild(taskDelete);
        taskControls.appendChild(taskDo);

        newTask.appendChild(taskText);
        newTask.appendChild(taskControls);

        tasksList.appendChild(newTask);
    });
}

const addTask = (isDone) => {

    const task = document.getElementById("task-input").value;
    if(task === null || task.trim() === "") return;
    taskArr.push({task, isDone});
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();

    const taskInput = document.getElementById("task-input");
    taskInput.value = "";
}

const editTask = (id) => {

    const taskIndex = parseInt(id[0]);
    const taskText = taskArr[taskIndex].task;
    taskArr.splice(taskIndex, 1);
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();

    const taskInput = document.getElementById("task-input");
    taskInput.value = taskText;
}

const deleteTask = (id) => {

    const taskIndex = parseInt(id[0]);
    taskArr.splice(taskIndex, 1);
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();
}

const doTask = (id) => {

    const taskIndex = parseInt(id[0]);
    taskArr[taskIndex].isDone = !taskArr[taskIndex].isDone;
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();
}

document.addEventListener("DOMContentLoaded", () => {

    const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
    if(savedTasks !== null) taskArr = [...savedTasks];
    updateView();
})

document.getElementById("task-submit-btn").addEventListener("click", () => addTask(false));

document.getElementById("task-clear-btn").addEventListener("click", () => {

    localStorage.clear();
    taskArr = [];
    updateView();
})


// Event listener for marking tasks as completed
document.getElementById('todoList').addEventListener('change', function (event) {
    if (event.target.type === 'checkbox') {
        const taskItem = event.target.parentElement;
        if (event.target.checked) {
            // Move completed task to the completed section
            document.getElementById('completedTasks').appendChild(taskItem);
            taskItem.classList.add('completed');
        } else {
            // Move incomplete task back to the todo list
            document.getElementById('todoList').appendChild(taskItem);
            taskItem.classList.remove('completed');
        }

        // Save tasks to local storage
        saveTasks();
    }
});

// Event listener for clearing all completed tasks
document.getElementById('clearCompletedButton').addEventListener('click', function () {
    const completedTasksList = document.getElementById('completedTasks');
    while (completedTasksList.firstChild) {
        completedTasksList.removeChild(completedTasksList.firstChild);
    }
    saveTasks(); // Update local storage after clearing completed tasks
});

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    const completedTasks = [];
    const taskItems = document.querySelectorAll('#todoList li, #completedTasks li');
    taskItems.forEach(function (taskItem) {
        const taskText = taskItem.querySelector('.taskText').textContent.trim();
        const isCompleted = taskItem.classList.contains('completed');
        if (isCompleted) {
            completedTasks.push({ text: taskText, completed: true });
        } else {
            tasks.push({ text: taskText, completed: false });
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        const todoList = document.getElementById('todoList');
        tasks.forEach(function (task) {
            addTaskToList(todoList, task.text, false);
        });
    }

    const storedCompletedTasks = localStorage.getItem('completedTasks');
    if (storedCompletedTasks) {
        const completedTasks = JSON.parse(storedCompletedTasks);
        const completedTasksList = document.getElementById('completedTasks');
        completedTasks.forEach(function (task) {
            addTaskToList(completedTasksList, task.text, true);
        });
    }
}

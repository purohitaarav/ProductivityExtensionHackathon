// combined.js

// Function to show the To-Do List Tab and hide the Pomodoro Timer Tab
function showTodoTab() {
    document.getElementById("todo").style.display = "block";
    document.getElementById("pomodoro").style.display = "none";
}

// Function to show the Pomodoro Timer Tab and hide the To-Do List Tab
function showPomodoroTab() {
    document.getElementById("todo").style.display = "none";
    document.getElementById("pomodoro").style.display = "block";
}

// Initially, display the To-Do List Tab (you can choose which one to display initially)
document.addEventListener("DOMContentLoaded", function() {
    showTodoTab(); // or showPomodoroTab() if you want to display the Pomodoro Timer initially
});

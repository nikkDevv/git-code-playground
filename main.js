document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const clearCompletedBtn = document.getElementById("clearCompletedBtn");

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    clearCompletedBtn.addEventListener("click", clearCompleted);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn">Delete</button>
        `;

        li.querySelector(".delete-btn").addEventListener("click", function() {
            li.remove();
        });

        taskList.appendChild(li);
        taskInput.value = "";
    }

    function clearCompleted() {
        const completedTasks = taskList.querySelectorAll("li");
        completedTasks.forEach(function(task) {
            if (task.querySelector("span").classList.contains("completed")) {
                task.remove();
            }
        });
    }
});

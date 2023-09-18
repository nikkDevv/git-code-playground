document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const clearCompletedBtn = document.getElementById("clearCompletedBtn");
    const completedTasks = document.getElementById("completedTasks");

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keyup", function (event) {
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
            <button class="complete-btn">Complete</button>
        `;

        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
        });

        li.querySelector(".complete-btn").addEventListener("click", function () {
            taskList.removeChild(li);
            completedTasks.appendChild(li);
            li.querySelector(".complete-btn").remove();
        });

        taskList.appendChild(li);
        taskInput.value = "";
    }

    function clearCompleted() {
        const completedTaskItems = completedTasks.querySelectorAll("li");
        completedTaskItems.forEach(function (taskItem) {
            taskItem.remove();
        });
    }
});

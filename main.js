document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const clearCompletedBtn = document.getElementById("clearCompletedBtn");
    const completedTasks = document.getElementById("completedTasks");
    const taskCount = document.getElementById("taskCount");
    const completedCount = document.getElementById("completedCount");
    const sortBtn = document.getElementById("sortBtn");

    // Load tasks from local storage on page load
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        createTaskElement(task.text, task.completed);
    });

    updateTaskCount();

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    clearCompletedBtn.addEventListener("click", clearCompleted);
    sortBtn.addEventListener("click", sortTasks);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const task = { text: taskText, completed: false };
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        createTaskElement(taskText);

        taskInput.value = "";
        updateTaskCount();
    }

    function createTaskElement(text, completed = false) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${text}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <button class="complete-btn">${completed ? "Undo" : "Complete"}</button>
        `;

        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
            removeTask(text);
        });

        li.querySelector(".complete-btn").addEventListener("click", function () {
            if (completed) {
                uncompleteTask(text);
            } else {
                completeTask(text);
            }
        });

        li.querySelector(".edit-btn").addEventListener("click", function () {
            const newText = prompt("Edit task:", text);
            if (newText !== null && newText !== "") {
                li.querySelector("span").textContent = newText;
                updateTaskText(text, newText);
            }
        });

        if (completed) {
            completedTasks.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
    }

    function completeTask(text) {
        tasks.forEach((task) => {
            if (task.text === text) {
                task.completed = true;
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));

        const taskElement = findTaskElement(text);
        if (taskElement) {
            taskElement.remove();
            completedTasks.appendChild(taskElement);
            taskElement.querySelector(".complete-btn").textContent = "Undo";
        }

        updateTaskCount();
    }

    function uncompleteTask(text) {
        tasks.forEach((task) => {
            if (task.text === text) {
                task.completed = false;
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));

        const taskElement = findTaskElement(text);
        if (taskElement) {
            taskElement.remove();
            taskList.appendChild(taskElement);
            taskElement.querySelector(".complete-btn").textContent = "Complete";
        }

        updateTaskCount();
    }

    function removeTask(text) {
        tasks = tasks.filter((task) => task.text !== text);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateTaskCount();
    }

    function updateTaskText(oldText, newText) {
        tasks.forEach((task) => {
            if (task.text === oldText) {
                task.text = newText;
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function findTaskElement(text) {
        const lists = [taskList, completedTasks];
        for (const list of lists) {
            const taskElements = list.querySelectorAll("li");
            for (const taskElement of taskElements) {
                if (taskElement.querySelector("span").textContent === text) {
                    return taskElement;
                }
            }
        }
        return null;
    }

    function clearCompleted() {
        const completedTaskItems = completedTasks.querySelectorAll("li");
        completedTaskItems.forEach(function (taskItem) {
            const text = taskItem.querySelector("span").textContent;
            removeTask(text);
            taskItem.remove();
        });
        updateTaskCount();
    }

    function sortTasks() {
        tasks.sort((a, b) => a.text.localeCompare(b.text));
        localStorage.setItem("tasks", JSON.stringify(tasks));

        taskList.innerHTML = "";
        completedTasks.innerHTML = "";

        tasks.forEach((task) => {
            createTaskElement(task.text, task.completed);
        });
    }

    function updateTaskCount() {
        const completed = tasks.filter((task) => task.completed).length;
        const remaining = tasks.length - completed;
        taskCount.textContent = `${remaining} ${remaining === 1 ? "task" : "tasks"} remaining`;
        completedCount.textContent = `${completed} ${completed === 1 ? "task" : "tasks"} completed`;
    }
});

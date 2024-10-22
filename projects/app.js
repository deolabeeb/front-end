// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

// State to manage tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks from localStorage
window.onload = () => {
    displayTasks(tasks);
};

// Add Task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        saveTasks();
        displayTasks(tasks);
        taskInput.value = "";
    }
});

// Display Tasks
function displayTasks(taskArray) {
    taskList.innerHTML = ""; // Clear existing tasks
    taskArray.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add(task.completed ? "completed" : "");
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="complete-btn" data-index="${index}">${task.completed ? "Unmark" : "Complete"}</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Save Tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Mark Task as Complete/Incomplete or Delete Task
taskList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("complete-btn")) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        displayTasks(tasks);
    }
    if (e.target.classList.contains("delete-btn")) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks(tasks);
    }
});

// Filter Tasks by Status
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        let filteredTasks;
        if (filter === "all") {
            filteredTasks = tasks;
        } else if (filter === "active") {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (filter === "completed") {
            filteredTasks = tasks.filter(task => task.completed);
        }
        displayTasks(filteredTasks);
    });
});


console.log("Add Task Button Clicked"); // After the "Add Task" button is clicked
console.log("Task input is empty"); // If no task is entered
console.log("Complete button clicked"); // When the Complete button is clicked
console.log("Delete button clicked"); // When the Delete button is clicked

if (taskText) {
    // Add the task if it's not empty
    const newTask = { text: taskText, completed: false };
    tasks.push(newTask);
    saveTasks();
    displayTasks(tasks);
    taskInput.value = ""; // Clear the input field
} else {
    console.log("Task input is empty");
}

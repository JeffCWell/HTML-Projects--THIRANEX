const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Save to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Tasks
function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button class="complete-btn" data-id="${task.id}">
                    ${task.completed ? "Undo" : "Done"}
                </button>
                <button class="edit-btn" data-id="${task.id}">
                    Edit
                </button>
                <button class="delete-btn" data-id="${task.id}">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Create Task
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

// Event Delegation
taskList.addEventListener("click", (e) => {

    const id = Number(e.target.dataset.id);

    // Delete
    if(e.target.classList.contains("delete-btn")){
        tasks = tasks.filter(task => task.id !== id);
    }

    // Complete
    if(e.target.classList.contains("complete-btn")){
        tasks = tasks.map(task =>
            task.id === id
                ? {...task, completed: !task.completed}
                : task
        );
    }

    // Edit
    if(e.target.classList.contains("edit-btn")){
        const newText = prompt(
            "Edit Task",
            tasks.find(task => task.id === id).text
        );

        if(newText){
            tasks = tasks.map(task =>
                task.id === id
                    ? {...task, text: newText}
                    : task
            );
        }
    }

    saveTasks();
    renderTasks();
});

// Filters
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        filterButtons.forEach(b =>
            b.classList.remove("active")
        );

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        renderTasks();
    });
});

// Initial Load
renderTasks();

const darkModeBtn = document.getElementById("darkModeBtn");

// Load saved theme
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    darkModeBtn.textContent = "☀ Light Mode";
}

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
        darkModeBtn.textContent = "☀ Light Mode";
    }else{
        localStorage.setItem("theme", "light");
        darkModeBtn.textContent = "🌙 Dark Mode";
    }

});
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const tasksList = document.getElementById("tasks");
const messageEl = document.getElementById("message");
const totalCountEl = document.getElementById("total-count");
const completedCountEl = document.getElementById("completed-count");

let tasks = [];

function showMessage(text, type = "") {
  messageEl.textContent = text;
  messageEl.className = "message";
  if (type) {
    messageEl.classList.add('message--${type}');
  }
  if (text) {
    setTimeout(() => {
      messageEl.textContent = "";
      messageEl.className = "message";
    }, 2000);
  }
}

function updateCounters() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  totalCountEl.textContent = total;
  completedCountEl.textContent = completed;
}

function renderTasks() {
  tasksList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.dataset.id = task.id;

    const left = document.createElement("div");
    left.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add("completed");
    }

    left.appendChild(checkbox);
    left.appendChild(span);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-small btn-delete";
    deleteBtn.textContent = "Delete";

    actions.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(actions);
    tasksList.appendChild(li);
  });

  updateCounters();
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const text = taskInput.value.trim();

  if (!text) {
    showMessage("Task cannot be empty.", "error");
    return;
  }

  const newTask = {
    id: Date.now().toString(),
    text,
    completed: false
  };
  tasks.push(newTask);
  taskInput.value = "";
  showMessage("Task added.", "success");
  renderTasks();
});

tasksList.addEventListener("click", event => {
  const li = event.target.closest(".task-item");
  if (!li) return;

  const id = li.dataset.id;

  if (event.target.matches(".task-checkbox")) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
  }

  if (event.target.matches(".btn-delete")) {
    tasks = tasks.filter(task => task.id !== id);
    showMessage("Task deleted.", "success");
    renderTasks();
  }
});

renderTasks();
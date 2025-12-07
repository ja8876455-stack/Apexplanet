
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

function showError(field, msg) {
  document.querySelector(`[data-error-for='${field}']`).textContent = msg;
}

function isEmailValid(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  contactStatus.textContent = "";

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  let valid = true;
  showError("name", "");
  showError("email", "");
  showError("message", "");

  if (!name) { showError("name", "Required"); valid = false; }
  if (!email) { showError("email", "Required"); valid = false; }
  else if (!isEmailValid(email)) { showError("email", "Invalid email"); valid = false; }
  if (message.length < 10) { showError("message", "At least 10 chars"); valid = false; }

  if (!valid) return;

  contactStatus.textContent = "Message sent! (simulated)";
  contactForm.reset();
});

/* --------------------- TODO LIST --------------------- */
const TODO_KEY = "apex_task2_todos";

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoListEl = document.getElementById("todoList");
const filterSelect = document.getElementById("filterSelect");
const clearCompleted = document.getElementById("clearCompleted");

let todos = [];

function loadTodos() {
  const raw = localStorage.getItem(TODO_KEY);
  todos = raw ? JSON.parse(raw) : [];
}
function saveTodos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function renderTodos() {
  const filter = filterSelect.value;
  todoListEl.innerHTML = "";

  const filtered = todos.filter(t => {
    if (filter === "all") return true;
    if (filter === "active") return !t.done;
    return t.done;
  });

  if (filtered.length === 0) {
    todoListEl.innerHTML = `<p class="muted">No tasks</p>`;
    return;
  }

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = "todo-item";

    const left = document.createElement("div");
    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.checked = item.done;

    const span = document.createElement("div");
    span.textContent = item.text;
    span.className = item.done ? "todo-text completed" : "todo-text";

    chk.addEventListener("change", () => {
      item.done = chk.checked;
      saveTodos();
      renderTodos();
    });

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.style.border = "0";
    del.style.background = "none";
    del.style.color = "red";
    del.style.cursor = "pointer";

    del.addEventListener("click", () => {
      todos = todos.filter(t => t.id !== item.id);
      saveTodos();
      renderTodos();
    });

    left.appendChild(chk);
    left.appendChild(span);

    div.appendChild(left);
    div.appendChild(del);

    todoListEl.appendChild(div);
  });
}

/* Add Task */
todoForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  todos.unshift({ id: Date.now(), text, done: false });
  saveTodos();
  renderTodos();
  todoForm.reset();
});

/* Filters */
filterSelect.addEventListener("change", renderTodos);

/* Clear completed */
clearCompleted.addEventListener("click", () => {
  todos = todos.filter(t => !t.done);
  saveTodos();
  renderTodos();
});

/* Initialize */
loadTodos();
renderTodos();

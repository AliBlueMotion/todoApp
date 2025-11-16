const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
const removeDoneTasks = document.querySelector('#removeDoneTasks');

//array for tasks
let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
}

//  add task
form.addEventListener('submit', addTask);
function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    tasks.push(task);
    saveToLocalStorage();
    renderTasks();

    taskInput.value = '';
    taskInput.focus();
}
//draw tasks
function renderTasks() {
    tasksList.innerHTML = '';

    if (tasks.length === 0) {
        tasksList.innerHTML = `
            <li id="emptyList" class="list-group-item empty-list">
                <div style="font-size: 48px;">📋</div>
                <div class="empty-list__title">Список дел пуст</div>
            </li>
        `;
        return;
    }

    tasks.forEach(function(task) {
        const taskHtml = `
            <li class="list-group-item task-item ${task.done ? 'done' : ''}" data-id="${task.id}">
                <span class="task-title">${task.text}</span>
                <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${task.done ? '#4CAF50' : '#fff'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </button>
                    <button type="button" data-action="delete" class="btn-action">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </li>
        `;
        tasksList.insertAdjacentHTML('beforeend', taskHtml);
    });
}

tasksList.addEventListener('click', deleteTask);
function deleteTask(e) {
    const deleteBtn = e.target.closest('[data-action="delete"]');
    if (!deleteBtn) return;

    const parentNode = deleteBtn.closest('.list-group-item');
    const taskId = Number(parentNode.dataset.id);

    tasks = tasks.filter(function(task) {
        return task.id !== taskId;
    });

    saveToLocalStorage();
    renderTasks();
}

// done tasks
tasksList.addEventListener('click', doneTask);
function doneTask(e) {
    const doneBtn = e.target.closest('[data-action="done"]');
    if (!doneBtn) return;

    const parentNode = doneBtn.closest('.list-group-item');
    const taskId = Number(parentNode.dataset.id);

    const task = tasks.find(function(task) {
        return task.id === taskId;
    });

    if (task) {
        task.done = !task.done;
    }

    saveToLocalStorage();
    renderTasks();
}

// delete tasks
removeDoneTasks.addEventListener('click', function() {
    tasks = tasks.filter(function(task) {
        return !task.done;
    });

    saveToLocalStorage();
    renderTasks();
});

// save at localStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
"use strict";
const taskList = JSON.parse(localStorage.getItem('taskList') || '[]');
displayTasks();
const completedTaskList = JSON.parse(localStorage.getItem('completedTaskList') || '[]');
displayCompletedTasks();
function addTask() {
    const input = document.getElementById('newTask');
    const taskContent = input.value.trim();
    if (taskContent === '')
        return;
    const task = { content: taskContent };
    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    input.value = '';
    displayTasks();
}
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('newTask');
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                addTask();
            }
        });
    }
    displayTasks();
    displayCompletedTasks();
});
function completeTask(ind) {
    completedTaskList.push(taskList[ind]);
    localStorage.setItem('completedTaskList', JSON.stringify(completedTaskList));
    taskList.splice(ind, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    displayTasks();
    displayCompletedTasks();
}
function editTask(ind) {
    const newTask = prompt('Edit task:', taskList[ind].content);
    if (newTask !== null && newTask.trim() !== '') {
        taskList[ind].content = newTask.trim();
        localStorage.setItem('taskList', JSON.stringify(taskList));
        displayTasks();
    }
}
function deleteTask(ind) {
    taskList.splice(ind, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    displayTasks();
}
function displayTasks() {
    const taskDiv = document.getElementById('taskListDisplay');
    if (!taskDiv)
        return;
    taskDiv.innerHTML = '';
    if (taskList.length === 0) {
        const empty = document.createElement('span');
        empty.textContent = 'No tasks available';
        empty.className = 'empty';
        taskDiv.appendChild(empty);
    }
    else {
        taskList.forEach((t, index) => {
            const taskContainer = document.createElement('div');
            taskContainer.className = 'task-item';
            const taskText = document.createElement('span');
            taskText.textContent = `${index + 1}, ${t.content}`;
            taskText.className = 'task-text';
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Done';
            completeBtn.className = 'complete-btn';
            completeBtn.addEventListener('click', () => {
                completeTask(index);
            });
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'edit-btn';
            editBtn.addEventListener('click', () => {
                editTask(index);
            });
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                deleteTask(index);
            });
            taskContainer.appendChild(taskText);
            taskContainer.appendChild(completeBtn);
            taskContainer.appendChild(editBtn);
            taskContainer.appendChild(deleteBtn);
            taskDiv.appendChild(taskContainer);
        });
    }
}
function displayCompletedTasks() {
    const completedTasksDiv = document.getElementById('completedTaskListDisplay');
    if (!completedTasksDiv)
        return;
    completedTasksDiv.innerHTML = '';
    if (completedTaskList.length === 0) {
        const empty = document.createElement('span');
        empty.textContent = 'No completed tasks';
        empty.className = 'empty';
        completedTasksDiv.appendChild(empty);
    }
    else {
        completedTaskList.forEach((t, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'completed-item';
            const taskText = document.createElement('span');
            taskText.textContent = `${t.content}`;
            taskText.className = 'task-text';
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                deleteCompletedTask(index);
            });
            taskDiv.appendChild(taskText);
            taskDiv.appendChild(deleteBtn);
            completedTasksDiv.appendChild(taskDiv);
        });
    }
}
function deleteCompletedTask(ind) {
    completedTaskList.splice(ind, 1);
    localStorage.setItem('completedTaskList', JSON.stringify(completedTaskList));
    displayCompletedTasks();
}
//# sourceMappingURL=todo.js.map
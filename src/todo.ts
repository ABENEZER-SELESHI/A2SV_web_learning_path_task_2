interface Task {
    content: string;
}

const taskList: Task[] = JSON.parse(localStorage.getItem('taskList') || '[]');
displayTasks()

const completedTaskList: Task[] = JSON.parse(localStorage.getItem('completedTaskList') || '[]');
displayCompletedTasks()




//Add new task

function addTask(): void {
    const input = document.getElementById('newTask') as HTMLInputElement;
    const taskContent = input.value.trim()

    if (taskContent === '') return;
    const task:Task = {content: taskContent}
    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    input.value = '';
    displayTasks()
}

// add task just by pressing enter
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('newTask') as HTMLInputElement;

    if (input) {
        input.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                addTask()
            }
        })
    }

    displayTasks();
    displayCompletedTasks();

})

//Complete Task
function completeTask(ind: number): void { //fix the any type
    completedTaskList.push(taskList[ind])
    localStorage.setItem('completedTaskList', JSON.stringify(completedTaskList));
    taskList.splice(ind, 1)
    localStorage.setItem('taskList', JSON.stringify(taskList));
    displayTasks()
    displayCompletedTasks()
}

//Edit task
function editTask(ind: number): void {
    const newTask = prompt('Edit task:', taskList[ind].content);

    if (newTask !== null && newTask.trim() !== '') {
        taskList[ind].content = newTask.trim();
        localStorage.setItem('taskList', JSON.stringify(taskList));
        displayTasks();
    }
}

//Delete Task
function deleteTask(ind: number): void {
    taskList.splice(ind, 1)
    localStorage.setItem('taskList', JSON.stringify(taskList));
    displayTasks()
}

//Display Task
function displayTasks(): void {
    const taskDiv = document.getElementById('taskListDisplay');
    if (!taskDiv) return;
    taskDiv.innerHTML = '';

    if (taskList.length === 0) {
        const empty = document.createElement('span');
        empty.textContent = 'No tasks available';
        empty.className = 'empty'
        taskDiv.appendChild(empty);
    } else {
        taskList.forEach((t, index) => {
            const taskContainer = document.createElement('div');
            taskContainer.className = 'task-item';

            //task text
            const taskText = document.createElement('span');
            taskText.textContent = `${index + 1}, ${t.content}`
            taskText.className = 'task-text'

            //complete button
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Done';
            completeBtn.className = 'complete-btn';
            completeBtn.addEventListener('click', () => {
                completeTask(index);
            })

            //edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'edit-btn';
            editBtn.addEventListener('click', () => {
                editTask(index);
            })

            //delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                deleteTask(index);
            })

            taskContainer.appendChild(taskText);
            taskContainer.appendChild(completeBtn);
            taskContainer.appendChild(editBtn);
            taskContainer.appendChild(deleteBtn);

            taskDiv.appendChild(taskContainer);

        })
    }
}

//Display Completed Task
function displayCompletedTasks(): void {
    const completedTasksDiv = document.getElementById('completedTaskListDisplay')
    if (!completedTasksDiv) return;
    completedTasksDiv.innerHTML = '';

    if (completedTaskList.length === 0) {
        const empty = document.createElement('span');
        empty.textContent = 'No completed tasks';
        empty.className = 'empty';
        completedTasksDiv.appendChild(empty);
    } else {
        completedTaskList.forEach((t, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'completed-item';

            //task text
            const taskText = document.createElement('span');
            taskText.textContent = `${t.content}`;
            taskText.className = 'task-text';

            //delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                deleteCompletedTask(index);
            })

            taskDiv.appendChild(taskText);
            taskDiv.appendChild(deleteBtn);

            completedTasksDiv.appendChild(taskDiv);
        })
    }
}

//Delete completed Task
function deleteCompletedTask(ind: number): void {
    completedTaskList.splice(ind, 1);
    localStorage.setItem('completedTaskList', JSON.stringify(completedTaskList));
    displayCompletedTasks()
}

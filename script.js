document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    function addTask(textFromStorage, save = true) {
        let taskText;

        if (typeof textFromStorage === 'string') {
            taskText = textFromStorage.trim();
        } else {
            taskText = taskInput.value.trim();
        }

        if (!taskText) {
            if (!textFromStorage) {
                alert('Please enter a task.');
            }
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        removeBtn.onclick = function () {
            taskList.removeChild(li);

            const storedTasks = getStoredTasks();
            const index = storedTasks.indexOf(taskText);
            if (index > -1) {
                storedTasks.splice(index, 1);
                saveTasks(storedTasks);
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (!textFromStorage) {
            taskInput.value = '';
        }

        if (save) {
            const storedTasks = getStoredTasks();
            storedTasks.push(taskText);
            saveTasks(storedTasks);
        }
    }

    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') addTask();
    });

    loadTasks();
});

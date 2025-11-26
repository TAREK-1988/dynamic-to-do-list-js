// Ensure the script runs only after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Load tasks from Local Storage and render them on the page
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        storedTasks.forEach(function (taskText) {
            // Pass false so we don't save again to Local Storage while loading
            addTask(taskText, false);
        });
    }

    /**
     * Add a new task to the list (and optionally save it to Local Storage)
     * @param {string} [taskText] - Optional text (used when loading from Local Storage)
     * @param {boolean} [save=true] - Whether to save the task to Local Storage
     */
    function addTask(taskText, save = true) {
        // If no taskText passed (button click / Enter key), read from input
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        } else {
            taskText = taskText.trim();
        }

        // If the task text is empty, alert the user and stop
        if (taskText === '') {
            // Only alert when user is typing, not when loading from Local Storage
            if (save) {
                alert('Please enter a task.');
            }
            return;
        }

        // Create the list item (li) element and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button element
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';

        // Add the 'remove-btn' class using classList.add as required
        removeBtn.classList.add('remove-btn');

        // When the remove button is clicked, remove the task from the DOM and Local Storage
        removeBtn.onclick = function () {
            // Remove from the DOM
            taskList.removeChild(li);

            // Remove from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(taskText);

            if (index !== -1) {
                storedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear the input field for the next task
        taskInput.value = '';

        // Save the new task to Local Storage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    /**
     * Event listener for the "Add Task" button
     * Calls addTask when the button is clicked
     */
    addButton.addEventListener('click', function () {
        addTask();
    });

    /**
     * Event listener for the task input field
     * Allows adding tasks by pressing the "Enter" key
     */
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load existing tasks from Local Storage when the page finishes loading
    loadTasks();
});

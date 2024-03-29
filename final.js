document.addEventListener('DOMContentLoaded', () => {


    // Get tasks from local storage or initialize an empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];


    const addTaskBtn = document.getElementById("add-task");
    const taskInput = document.getElementById("task-input");
    const errorMsg = document.getElementById("error-msg");
    const itemsContainer = document.getElementById("items");

    // Initialize task ID counter based on the number of tasks
    let taskIdCounter = tasks.length > 0 ? tasks.length + 1 : 1;



    // code to add new task when the add task button is clicked

    addTaskBtn.addEventListener("click", function () {

        const taskName = taskInput.value.trim(); // Remove leading/trailing whitespace

        if (taskName === "") {
            // Display error message if task name is empty
            errorMsg.textContent = "Task name cannot be empty, please enter the task name";
            return; // Stop execution
        }

        // Clear error message if there was any
        errorMsg.textContent = "";

        // Create new task item
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        // Create checkbox input
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", "task-status-" + taskIdCounter);
        checkbox.setAttribute("name", "task-status-" + taskIdCounter);
        checkbox.classList.add("task-status");
        taskItem.appendChild(checkbox);

        // Create label
        const label = document.createElement("label");
        label.setAttribute("for", "task-status-" + taskIdCounter);
        const span = document.createElement("span");
        span.classList.add("task-name");
        span.setAttribute("contenteditable", "false");
        span.textContent = taskName;
        label.appendChild(span);
        taskItem.appendChild(label);

        // Create edit and delete icons
        const editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid", "fa-pen");
        taskItem.appendChild(editIcon);
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-xmark");
        taskItem.appendChild(deleteIcon);

        // Append task item to items container
        itemsContainer.appendChild(taskItem);

        

        // Clear input field after adding task
        taskInput.value = "";




        // storing in local storage 

        // Create task object
        const taskObj = {
            id: taskIdCounter,
            name: taskName,
            status: false // Initially set status as unchecked
        };

        // Add new task object to tasks array
        tasks.push(taskObj);

        // Update tasks array in local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));


        // Increment task ID counter for next task
        taskIdCounter++;

    });


    // in the above when new task is added to it also stored in local storage also





    // click event listener 

    document.addEventListener('click', function (event) {


        // checking the event is for editing task name 

        if (event.target.classList.contains('fa-pen')) {
            // Get the parent task item
            let taskItem = event.target.closest('.task-item');
            // Get the task name element within the task item
            let taskName = taskItem.querySelector('.task-name');
            // Check if task name is editable
            let isEditable = taskName.getAttribute('contenteditable') === 'true';

            // If task name is already editable
            if (isEditable) {
                // Make it non-editable
                taskName.setAttribute('contenteditable', 'false');
            } else {
                // Make it editable
                taskName.setAttribute('contenteditable', 'true');
                // Focus on the task name element to allow immediate typing
                taskName.focus();
            }
        }




        // after editing if user clicks outside the task making it un-editable 

        let taskNames = document.querySelectorAll('.task-name');
        // Check if the clicked element is not an edit button and not a task name element
        if (!event.target.classList.contains('fa-pen')) {
            taskNames.forEach((taskName) => {
                // Make all task name elements non-editable
                taskName.setAttribute('contenteditable', 'false');
            });
        }





        // code for deleting tassk

        if (event.target.classList.contains('fa-xmark')) {

            // Find the parent task item and remove it
            const taskItem = event.target.closest('.task-item');
            const taskId = parseInt(taskItem.querySelector('.task-status').id.replace('task-status-', ''));

            // Remove task from tasks array in local storage
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks = tasks.filter(task => task.id !== taskId);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // Remove task item from UI
            taskItem.remove();
        }
    });




    // Add keypress event listener to handle Enter key press
    document.addEventListener('keypress', function (event) {
        // Check if the pressed key is Enter (key code 13)
        if (event.key === 'Enter') {
            // Get the focused element
            let focusedElement = document.activeElement;
            // Check if the focused element is a task name element
            if (focusedElement.classList.contains('task-name')) {
                // Make the task name element non-editable
                focusedElement.setAttribute('contenteditable', 'false');
            }
        }
    });









    // code for checking task status if completed it will be striked off , or else not 

    document.addEventListener('change', function (event) {
        if (event.target.classList.contains('task-status')) {
            let checkbox = event.target;
            let label = checkbox.nextElementSibling.querySelector('span');
            let taskId = parseInt(checkbox.id.replace('task-status-', ''));

            // Update task status in local storage
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            let taskToUpdate = tasks.find(task => task.id === taskId);
            if (taskToUpdate) {
                taskToUpdate.status = checkbox.checked;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }

            // Update task appearance based on status
            if (checkbox.checked) {
                label.style.textDecoration = 'line-through'; // Apply strikethrough when checked
            } else {
                label.style.textDecoration = 'none'; // Remove strikethrough when unchecked
            }
        }
    });




    // updating task name when its changed task names for editing


    document.addEventListener('input', function (event) {
        if (event.target.classList.contains('task-name')) {
            // Get the parent task item
            let taskItem = event.target.closest('.task-item');
            // Get the task ID from the checkbox ID
            let taskId = parseInt(taskItem.querySelector('.task-status').id.replace('task-status-', ''));
            // Get the updated task name
            let newTaskName = event.target.textContent.trim();

            // Update task name in local storage
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            let taskToUpdate = tasks.find(task => task.id === taskId);
            if (taskToUpdate) {
                taskToUpdate.name = newTaskName;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
    });






































    if (tasks.length === 0) {
        return
    } else {
        // Loop through tasks array and render task items
        tasks.forEach(task => {
            // Create new task item
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");

            // Create checkbox input
            const checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", "task-status-" + task.id);
            checkbox.setAttribute("name", "task-status-" + task.id);
            checkbox.classList.add("task-status");
            if (task.status) {
                checkbox.checked = true; // Set checkbox checked if task status is true
            }
            taskItem.appendChild(checkbox);

            // Create label
            const label = document.createElement("label");
            label.setAttribute("for", "task-status-" + task.id);
            const span = document.createElement("span");
            span.classList.add("task-name");
            span.setAttribute("contenteditable", "false");
            span.textContent = task.name;
            if (task.status) {
                span.style.textDecoration = 'line-through'; // Apply strikethrough if task status is true
            }
            label.appendChild(span);
            taskItem.appendChild(label);

            // Create edit and delete icons
            const editIcon = document.createElement("i");
            editIcon.classList.add("fa-solid", "fa-pen");
            taskItem.appendChild(editIcon);
            const deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fa-solid", "fa-xmark");
            taskItem.appendChild(deleteIcon);

            // Append task item to items container
            itemsContainer.appendChild(taskItem);
        });
    }

})
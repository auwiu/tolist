window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    // Load tasks from local storage on page load
    loadTasksFromLocalStorage();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please fill out the task");
            return;
        }

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_action_el = document.createElement("div");
        task_action_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_action_el.appendChild(task_edit_el);
        task_action_el.appendChild(task_delete_el);

        task_el.appendChild(task_action_el);

        list_el.appendChild(task_el);

        // Save tasks to local storage
        saveTasksToLocalStorage();

        input.value = "";
    });

    // Event delegation for edit and delete buttons
    list_el.addEventListener('click', (e) => {
        const target = e.target;
        const task_el = target.closest('.task');

        if (!task_el) return;

        const task_input_el = task_el.querySelector('.text');
        const task_edit_el = task_el.querySelector('.edit');

        if (target.classList.contains('edit')) {
            if (task_edit_el.innerText.toLowerCase() === 'edit') {
                task_input_el.removeAttribute('readonly');
                task_input_el.focus();
                task_edit_el.innerText = 'Save';
            } else {
                task_input_el.setAttribute('readonly', 'readonly');
                task_edit_el.innerText = 'Edit';
                
                // Save tasks to local storage after editing
                saveTasksToLocalStorage();
            }
        } else if (target.classList.contains('delete')) {
            list_el.removeChild(task_el);
            
            // Save tasks to local storage after deletion
            saveTasksToLocalStorage();
        }
    });

    function saveTasksToLocalStorage() {
        const tasks = Array.from(list_el.children).map(taskEl => taskEl.querySelector('.text').value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        savedTasks.forEach(task => {
            const task_el = document.createElement("div");
            task_el.classList.add("task");

            const task_content_el = document.createElement("div");
            task_content_el.classList.add("content");

            task_el.appendChild(task_content_el);

            const task_input_el = document.createElement("input");
            task_input_el.classList.add("text");
            task_input_el.type = "text";
            task_input_el.value = task;
            task_input_el.setAttribute("readonly", "readonly");

            task_content_el.appendChild(task_input_el);

            const task_action_el = document.createElement("div");
            task_action_el.classList.add("actions");

            const task_edit_el = document.createElement("button");
            task_edit_el.classList.add("edit");
            task_edit_el.innerHTML = "Edit";

            const task_delete_el = document.createElement("button");
            task_delete_el.classList.add("delete");
            task_delete_el.innerHTML = "Delete";

            task_action_el.appendChild(task_edit_el);
            task_action_el.appendChild(task_delete_el);

            task_el.appendChild(task_action_el);

            list_el.appendChild(task_el);
        });
    }
});
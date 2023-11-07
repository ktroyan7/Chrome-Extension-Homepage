// Get a reference to the todo list element and the input and add button elements
const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('newtask');
const addButton = document.getElementById('addtask');

// Get the tasks from storage and update the todo list
chrome.storage.sync.get('tasks', (items) => {
  updateTodoList(items.tasks || []);
});

function addNewTask() {
  // Get the value of the input field
  const task = todoInput.value;

  // Clear the input field
  todoInput.value = '';

  // Get the current tasks from storage
  chrome.storage.sync.get('tasks', (items) => {
    // Add the new task to the tasks array
    const tasks = items.tasks || [];
    console.log(tasks)
    tasks.push(task);

    // Save the updated tasks array to storage
    chrome.storage.sync.set({ tasks }, () => {
      // Update the todo list
      updateTodoList(tasks);
    });
  });
}

// Add a click event listener to the add button
addButton.addEventListener('click', () => {
  addNewTask();
});

// Add an event listener when the user types the enter key to add a new task
newtask.addEventListener('keydown', function (event) {
  // Check if the user pressed the Enter key
  if (event.key === 'Enter') {
    // If the user pressed Enter, add a new task
    addNewTask();
  }
});

// A function to update the todo list
function updateTodoList(tasks) {
  // Clear the todo list element
  todoList.innerHTML = '';

  // Create a div element for each task and append it to the todo list
  for (const task of tasks) {
    const taskElement = document.createElement('div');
    taskElement.innerHTML = task;
    taskElement.classList.add('task');

    // Add a delete button to the task element
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<i class='fas fa-trash-alt'></i>`;
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
      // Remove the task from the tasks array
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);

      // Save the updated tasks array to storage
      chrome.storage.sync.set({ tasks }, () => {
        // Update the todo list
        updateTodoList(tasks);
      });
    });
    taskElement.appendChild(deleteButton);

    todoList.appendChild(taskElement);
  }
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && 'tasks' in changes) {
    updateTodoList(changes.tasks.newValue);
  }
});


document.getElementById("todo").addEventListener("click", function() {
  let element = document.getElementById("card");
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
});


/* document.getElementById("todo").addEventListener("click", function() {
  var element = document.getElementById("card");
  if (element.getAttribute("style") === "display: none;") {
    element.setAttribute("style", "display: block;");
  } else {
    element.setAttribute("style", "display: none;");
  }
});
*/



/* const todoClick = document.getElementById("todo");
const todoCard = document.getElementById("card");

// Add a click event listener to the "todo" button
todoClick.addEventListener('click', () => {
  let todoVisible = todoCard.getAttribute("id")
    if (todoVisible === "hidden") {
      todoVisible.setAttribute("visibility", "visible")
    }
    else {
      todoVisible.setAttribute('visibility', "hidden")
    }
});
*/

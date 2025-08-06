// Main To-Do List App Logic

// Import required modules
import { TaskError } from './exceptions.js';
import { countCompletedTasks } from './recursion.js';
import { capitalizeFirstLetter } from './utils.js';
import { showToast } from '../lib/library.js';

// App state
let tasks = [];

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const totalTasksDisplay = document.getElementById('totalTasks');
const completedTasksDisplay = document.getElementById('completedTasks');
const currentDateDisplay = document.getElementById('current-date');

// Display today's date using Day.js
currentDateDisplay.textContent = "Today: " + dayjs().format('dddd, MMMM D, YYYY');

// Add button event listener
addTaskBtn.addEventListener('click', handleAddTask);

/**
 * Handles adding a new task to the list
 */
function handleAddTask() {
  try {
    const rawInput = taskInput.value.trim();

    // Input validation
    if (!rawInput) throw new TaskError("Task input cannot be empty");

    const task = {
      id: Date.now(),
      title: capitalizeFirstLetter(rawInput),
      completed: false,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm')
    };

    tasks.push(task);
    taskInput.value = '';
    showToast("Task added successfully");
    renderTasks();
  } catch (error) {
    if (error instanceof TaskError) {
      showToast(error.message);
    } else {
      console.error(error);
      showToast("An unexpected error occurred.");
    }
  }
}

/**
 * Renders all tasks to the DOM
 */
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const titleSpan = document.createElement('span');
    titleSpan.textContent = `${task.title} (${task.createdAt})`;
    titleSpan.style.cursor = 'pointer';
    titleSpan.addEventListener('click', () => toggleTask(task.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(titleSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateSummary();
}

/**
 * Toggles the completed status of a task
 * @param {number} id - Task ID
 */
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

/**
 * Deletes a task by its ID
 * @param {number} id - Task ID
 */
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  showToast("Task deleted");
  renderTasks();
}

/**
 * Updates the total and completed task counts
 */
function updateSummary() {
  totalTasksDisplay.textContent = tasks.length;
  completedTasksDisplay.textContent = countCompletedTasks(tasks);
}

// Optional: Initialize with demo tasks (uncomment to test)
/*
tasks = [
  { id: 1, title: "Buy groceries", completed: false, createdAt: dayjs().format('YYYY-MM-DD HH:mm') },
  { id: 2, title: "Walk the dog", completed: true, createdAt: dayjs().format('YYYY-MM-DD HH:mm') }
];
renderTasks();
*/

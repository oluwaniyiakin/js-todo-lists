/**
 * Recursively count completed tasks in the array
 * @param {Array} tasks - List of task objects
 * @param {number} index - Internal recursion index
 * @returns {number}
 */
export function countCompletedTasks(tasks, index = 0) {
  if (index >= tasks.length) return 0;
  const current = tasks[index].completed ? 1 : 0;
  return current + countCompletedTasks(tasks, index + 1);
}

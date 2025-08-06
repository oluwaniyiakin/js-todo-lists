// Custom Error Class for Task-related errors
export class TaskError extends Error {
  constructor(message) {
    super(message);
    this.name = "TaskError";
  }
}

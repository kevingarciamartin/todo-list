import "./static/css/reset.css";
import "./static/css/style.css";

function createTask(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
  };
}

function createProject(title) {
  const tasks = [];

  const addTask = (task) => tasks.push(task);
  const removeTask = (task) => tasks.splice(tasks.indexOf(task), 1);

  return { title, tasks, addTask, removeTask };
}

const project = createProject("New project");

const task1 = createTask("Task 1", "Task description", "2024.10.28", 0);
const task2 = createTask("Task 2", "Task description", "2024.10.28", 2);
const task3 = createTask("Task 3", "Task description", "2024.10.28", 2);
const task4 = createTask("Task 4", "Task description", "2024.10.28", 2);

console.log(project.tasks);
project.addTask(task1);
project.addTask(task2);
project.addTask(task3);
project.addTask(task4);
console.log(project.tasks);
project.tasks.forEach(task => console.log(task))
project.removeTask(task2);
console.log(project.tasks);
project.tasks.forEach(task => console.log(task))

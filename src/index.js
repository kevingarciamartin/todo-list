import "./static/css/reset.css";
import "./static/css/style.css";
import { createTask } from "./static/js/components/task";
import { createProject } from "./static/js/components/project";
import { formatISO9075, addDays } from "date-fns";

const initApp = (() => {
  const projects = [];
  const defaultProject = createProject("Default Project");

  projects.push(defaultProject);

  defaultProject.addTask(
    createTask("CCC", "Task 1 desc.", new Date("2016"), 1)
  );
  defaultProject.addTask(
    createTask("AAA", "Task 2 desc.", new Date("2001"), 0)
  );
  defaultProject.addTask(
    createTask("BBB", "Task 3 desc.", new Date("2010"), 2)
  );
  
  const tasksAsc = defaultProject.getSortedTasks('priority', 'ascending');
  const tasksDesc = defaultProject.getSortedTasks('priority', 'descending');
  const tasks = defaultProject.getTasks();
  
  tasks.forEach((task) => console.log(task));
  console.log('')
  tasksAsc.forEach((task) => console.log(task));
  console.log("");
  tasksDesc.forEach((task) => console.log(task));
  console.log("");
})();

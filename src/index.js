import "./static/css/reset.css";
import "./static/css/style.css";
import RenderProfile from "./static/js/components/RenderProfile";
import { createTask } from "./static/js/components/task";
import { createProject } from "./static/js/components/project";
import { formatISO9075, addDays } from "date-fns";

const initApp = (() => {
  const projects = [];
  const defaultProject = createProject("Default Project");

  defaultProject.addTask(
    createTask("Task 1", "Task 1 description.", new Date(), 2)
  );
  defaultProject.addTask(
    createTask("Task 2", "Task 2 description.", new Date(), 0)
  );
  defaultProject.addTask(
    createTask("Task 3", "Task 2 description.", new Date(), 1)
  );

  projects.push(defaultProject);

  const tasksAsc = defaultProject.getSortedTasks("priority", "ascending");
  const tasksDesc = defaultProject.getSortedTasks("priority", "descending");
  const tasks = defaultProject.getTasks();

  tasks.forEach((task) => console.log(task));
  console.log("");
  tasksAsc.forEach((task) => console.log(task));
  console.log("");
  tasksDesc.forEach((task) => console.log(task));
  console.log("");
})();

const renderApp = (() => {
  RenderProfile();

  const menu = document.querySelector("#menu");
  const content = document.querySelector("#content");
})();

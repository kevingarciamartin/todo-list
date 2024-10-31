import "./static/css/reset.css";
import "./static/css/style.css";
import RenderProfile from "./static/js/components/RenderProfile";
import RenderProjectToMenu from "./static/js/components/RenderProjectToMenu";
import { createTask } from "./static/js/components/task";
import { createProject } from "./static/js/components/project";
import { formatISO9075, addDays } from "date-fns";

const app = (() => {
  const projects = [];
  const defaultProject = createProject("Default Project");
  const p2 = createProject("Project 2");
  const p3 = createProject("Project 3");

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
  projects.push(p2);
  projects.push(p3);

  const tasksAsc = defaultProject.getSortedTasks("priority", "ascending");
  const tasksDesc = defaultProject.getSortedTasks("priority", "descending");
  const tasks = defaultProject.getTasks();

  // tasks.forEach((task) => console.log(task));
  // console.log("");
  // tasksAsc.forEach((task) => console.log(task));
  // console.log("");
  // tasksDesc.forEach((task) => console.log(task));
  // console.log("");

  return { projects };
})();

const renderApp = (() => {
  RenderProfile();
  app.projects.forEach((project) => RenderProjectToMenu(project));

  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // console.log(typeof event.target.dataset.projectTitle === 'string')
      if (typeof event.target.dataset.projectTitle === "string") {
        console.log(event.target.dataset.projectTitle);
      } else if (button.id === "add-task") {
        console.log("Add task");
      } else if (button.id === "tasks") {
        console.log("Tasks");
      } else if (button.id === "today") {
        console.log("Today");
      } else if (button.id === "upcoming") {
        console.log("Upcoming");
      } else if (button.id === "completed") {
        console.log("Completed");
      } else if (button.id === "archived") {
        console.log("Archived");
      }
    });
  });
})();

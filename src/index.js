import "./static/css/reset.css";
import "./static/css/style.css";
import RenderProfile from "./static/js/components/RenderProfile";
import RenderProjectsToMenu from "./static/js/components/RenderProjectsToMenu";
import {
  RenderAddProjectModal,
  HandleModal,
} from "./static/js/components/Modal";
import { createTask } from "./static/js/components/task";
import { createProject } from "./static/js/components/project";
import { formatISO9075, addDays } from "date-fns";

const app = (() => {
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

  return { projects };
})();

const renderApp = (() => {
  RenderProfile();
  RenderProjectsToMenu(app.projects);

  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (button.id === "add-task") {
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
      } else if (button.id === "add-project") {
        RenderAddProjectModal();
        HandleModal(app.projects);
      }
    });
  });
})();

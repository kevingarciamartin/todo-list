import "./static/css/reset.css";
import "./static/css/style.css";
import RenderProfile from "./static/js/components/RenderProfile";
import RenderProjectsToMenu from "./static/js/components/RenderProjectsToMenu";
import { RenderAddItemModal, HandleModal } from "./static/js/components/Modal";
import { createTask } from "./static/js/components/task";
import { createProject } from "./static/js/components/project";
import { addDays } from "date-fns";
import {
  RenderAllTasksToMain,
  RenderTodaysTasksToMain,
  RenderUpcomingTasksToMain,
} from "./static/js/components/RenderTasksToMain";

const app = (() => {
  const projects = [];
  const defaultProject = createProject("Default Project");

  defaultProject.addTask(
    createTask(
      "Task 1",
      "Task 1 description.",
      addDays(new Date(), 15),
      2,
      defaultProject.title
    )
  );
  defaultProject.addTask(
    createTask(
      "Task 2",
      "Task 2 description.",
      addDays(new Date(), 65),
      0,
      defaultProject.title
    )
  );
  defaultProject.addTask(
    createTask(
      "Task 3",
      "Task 3 description.",
      addDays(new Date(), 1),
      1,
      defaultProject.title
    )
  );

  projects.push(defaultProject);

  return { projects };
})();

const renderApp = (() => {
  RenderProfile();
  RenderProjectsToMenu(app.projects);

  const navButtons = document.querySelectorAll(".nav-btn");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id === "add-task") {
        RenderAddItemModal("task", app.projects);
        HandleModal(app.projects);
      } else if (button.id === "tasks") {
        RenderAllTasksToMain(app.projects);
      } else if (button.id === "today") {
        RenderTodaysTasksToMain(app.projects);
      } else if (button.id === "upcoming") {
        RenderUpcomingTasksToMain(app.projects);
      } else if (button.id === "add-project") {
        RenderAddItemModal("project", app.projects);
        HandleModal(app.projects);
      }
    });
  });
})();

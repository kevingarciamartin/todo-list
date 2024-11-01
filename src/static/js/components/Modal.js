import { createProject } from "./project";
import { createTask } from "./task";
import RenderProjectsToMenu from "./RenderProjectsToMenu";
import { RenderProjectTasksToMain } from "./RenderTasksToMain";
import { parseISO, addDays } from "date-fns";

export const RenderAddItemModal = (item, projectList) => {
  const body = document.querySelector("body");
  const modal = document.createElement("dialog");

  body.setAttribute("data-modal-active", "true");
  modal.id = `add-${item}-modal`;

  if (item === "project") {
    modal.innerHTML = `
      <form>
          <input type="text" name="title" id="project-title" placeholder="Project title">
          <hr>
          <div class="form-container">
              <div class="btn-container">
                  <button type="button" class="modal-btn" id="modal-cancel">Cancel</button>
                  <button type="button" class="modal-btn" id="modal-submit">Add</button>
              </div>
          </div>
      </form>
    `;
  } else if (item === "task") {
    const form = document.createElement("form");
    const formContainer = document.createElement("div");
    const fieldset = document.createElement("fieldset");
    const datalist = document.createElement("datalist");
    const buttonContainer = document.createElement("div");

    formContainer.classList.add("form-container");
    datalist.id = "projects";
    buttonContainer.classList.add("btn-container");

    form.innerHTML = `
      <input type="text" name="title" id="task-title" placeholder="Task title">
      <textarea name="description" id="task-description" placeholder="Task description..."></textarea>
      <hr>
    `;
    formContainer.innerHTML = `
      <input type="datetime-local" name="due-date" id="task-due-date">
      <fieldset>
        <input list="priorities" name="priority" id="task-priority" placeholder="Priority">
        <datalist id="priorities">
          <option value="Low"></option>
          <option value="Medium"></option>
          <option value="High"></option>
        </datalist>
      </fieldset>
    `;
    fieldset.innerHTML = `
      <input list="projects" name="project" id="task-project" placeholder="Project">
    `;
    buttonContainer.innerHTML = `
      <button type="button" class="modal-btn" id="modal-cancel">Cancel</button>
      <button type="button" class="modal-btn" id="modal-submit">Add</button>
    `;

    projectList.forEach((project) => {
      const option = document.createElement("option");
      option.setAttribute("value", project.title);
      datalist.appendChild(option);
    });

    modal.appendChild(form);
    form.appendChild(formContainer);
    formContainer.appendChild(fieldset);
    formContainer.appendChild(buttonContainer);
    fieldset.appendChild(datalist);
  }

  body.appendChild(modal);
};

export const HandleModal = (projectList) => {
  const body = document.querySelector("body");

  if (body.dataset.modalActive === "true") {
    const modal = document.querySelector("dialog");
    const modalButtons = document.querySelectorAll(".modal-btn");

    modalButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.id === "modal-cancel") {
          modal.remove();
          body.setAttribute("data-modal-active", "false");
          return null;
        } else if (button.id === "modal-submit") {
          if (modal.id === "add-project-modal") {
            const title = document.querySelector("#project-title");
            const projectTitle =
              title.value === ""
                ? `Project ${projectList.length + 1}`
                : title.value;
            const newProject = createProject(projectTitle);
            projectList.push(newProject);
            RenderProjectsToMenu(projectList);
          } else if (modal.id === "add-task-modal") {
            const title = document.querySelector("#task-title");
            const description = document.querySelector("#task-description");
            const dueDate = document.querySelector("#task-due-date");
            const priority = document.querySelector("#task-priority");
            const project = document.querySelector("#task-project");

            const taskProject =
              project.value === ""
                ? projectList[0]
                : projectList[
                    projectList.map((p) => p.title).indexOf(project.value)
                  ];
            const tasks = taskProject.getTasks();

            const taskTitle =
              title.value === "" ? `Task ${tasks.length + 1}` : title.value;
            const taskDescription =
              description.value === ""
                ? `${taskTitle} description.`
                : description.value;
            const taskDueDate =
              dueDate.value === ""
                ? addDays(new Date(), 1)
                : parseISO(dueDate.value);
            let taskPriority;
            if (priority.value === '' || priority.value === 'Low') {
              taskPriority = 0;
            } else if (priority.value === 'Medium') {
              taskPriority = 1;
            } else if (priority.value === 'High') {
              taskPriority = 2;
            }

            const task = createTask(taskTitle, taskDescription, taskDueDate, taskPriority)
            taskProject.addTask(task);

            RenderProjectTasksToMain(taskProject);
          }
          modal.remove();
          body.setAttribute("data-modal-active", "false");
        }
      });
    });
  }
};

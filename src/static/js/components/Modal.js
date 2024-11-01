import { createProject } from "./project";
import RenderProjectsToMenu from "./RenderProjectsToMenu";

export const RenderAddProjectModal = () => {
  const body = document.querySelector("body");
  const modal = document.createElement("dialog");

  body.setAttribute("data-modal-active", "true");
  modal.id = "add-project-modal";
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

  body.appendChild(modal);
};

export const HandleModal = (projectList) => {
  const body = document.querySelector("body");

  if (body.dataset.modalActive === "true") {
    const modal = document.querySelector("dialog");
    const modalButtons = document.querySelectorAll(".modal-btn");

    if (modal.id === "add-project-modal") {
      modalButtons.forEach((button) => {
        button.addEventListener("click", () => {
          if (button.id === "modal-cancel") {
            modal.remove();
            body.setAttribute("data-modal-active", "false");
            return null;
          } else if (button.id === "modal-submit") {
            const title = document.querySelector("#project-title");
            const projectTitle =
              title.value === ""
                ? `Project ${projectList.length + 1}`
                : title.value;
            const newProject = createProject(projectTitle);
            projectList.push(newProject);
            RenderProjectsToMenu(projectList);
            modal.remove();
            body.setAttribute("data-modal-active", "false");
          }
        });
      });
    }
  }
};

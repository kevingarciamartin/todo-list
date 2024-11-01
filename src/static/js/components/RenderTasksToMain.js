import { formatDistance } from "date-fns";

export const RenderProjectTasksToMain = (project) => {
  const content = document.querySelector("#content");

  content.innerHTML = `<h2>${project.title}</h2>`;

  if (project.getNumberOfTasks() === 0) {
    const p = document.createElement("p");
    p.textContent = "You have no tasks.";
    content.appendChild(p);
  } else {
    const h3 = document.createElement("h3");
    const ul = document.createElement("ul");
    h3.textContent = "Tasks";
    ul.classList.add("task-list");
    content.appendChild(h3);
    content.appendChild(ul);

    const tasks = project.getTasks();
    tasks.forEach((task) => {
      const taskPriority = task.priority;
      let priorityIcon;
      if (taskPriority === 0) {
        priorityIcon = "";
      } else if (taskPriority === 1) {
        priorityIcon =
          '<svg class="priority-medium" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>flag-variant</title><path d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3Z" /></svg>';
      } else if (taskPriority === 2) {
        priorityIcon =
          '<svg class="priority-high" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>flag-variant</title><path d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3Z" /></svg>';
      }

      const li = document.createElement("li");
      li.classList.add("task");
      li.innerHTML = `
            <div class="task-header">
              <input type="checkbox" name="task-checkbox">
              <h4>${task.title}</h4>
              <span>${priorityIcon}</span>
            </div>
            <p>${task.description}</p>
            <div class="task-footer">
              <div class="task-due-date">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alarm</title><path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z" /></svg>
                <span>${formatDistance(new Date(), task.dueDate)}</span>
              </div>
              <span>Project</span>
            </div>
          `;
      ul.appendChild(li);
    });
  }
};

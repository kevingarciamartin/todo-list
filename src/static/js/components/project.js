export const createProject = (title) => {
  const tasks = [];

  const addTask = (task) => tasks.push(task);
  const removeTask = (task) => tasks.splice(tasks.indexOf(task), 1);

  return { title, tasks, addTask, removeTask };
};

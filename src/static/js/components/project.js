export const createProject = (title) => {
  const tasks = [];

  const getTasks = () => tasks;
  const getSortedTasks = (key, order) => {
    if (typeof tasks[0][key] === "string") {
      return tasks.toSorted((a, b) => {
        let x = a[key].toLowerCase();
        let y = b[key].toLowerCase();
        if (order === 'ascending') {
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        } else if (order === 'descending') {
          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
          }
          return 0;
        }
      });
    } else if (
      typeof tasks[0][key] === "object" ||
      typeof tasks[0][key] === "number"
    ) {
      if (order === 'ascending') {
        return tasks.toSorted((a, b) => a[key] - b[key]);
      } else if (order === 'descending') {
        return tasks.toSorted((a, b) => b[key] - a[key]);
      }
    }
  };
  const addTask = (task) => tasks.push(task);
  const removeTask = (task) => tasks.splice(tasks.indexOf(task), 1);

  return {
    title,
    getTasks,
    getSortedTasks,
    addTask,
    removeTask,
  };
};

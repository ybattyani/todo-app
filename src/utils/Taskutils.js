import { getDate, getTomorrowDate } from "../utils/date";

export const PRIORITY_LEVELS = {
  low: "low",
  normal: "normal",
  high: "high",
};
export const TASK_CATEGORIES = {
  PERSONAL: {
    label: "Personal",
    color: "#00ba09",
  },
  WORK: {
    label: "Work",
    color: "#d400ff",
  },
  CHORES: {
    label: "Chores",
    color: "#ff8800",
  },
  MYAPP: {
    label: "MyApp",
    color: "#00f7ff",
  },
  TRAINING: {
    label: "Training",
    color: "#fff200",
  },
  COACHING: {
    label: "Coaching",
    color: "#0088ff",
  },
  OTHER: {
    label: "Other",
    color: "#ffffff",
  },
};

export const createTask = (input) => {
  console.log("Creating task with input:", input);
  // validate input fields
  return {
    id: crypto.randomUUID(),
    text: input.text || "New Task",
    completed: false,
    createdAt: Date.now(),
    dueDate: input.dueDate || getDate(),
    category: input.category || "PERSONAL",
    priority: input.priority || PRIORITY_LEVELS.normal,
    parentId: input.parentId || null,
    description: input.description || null,
  };
};
export const isTaskOverdue = (task) => {
    const today = getDate()
    return !task.completed && task.dueDate < today;
  }
export function buildTaskTree(tasks) {
  const map = {};
  const roots = [];

   // Initialize map
  tasks.forEach(task => {
    map[task.id] = { ...task, children: [] };
  });

  // Build tree
  tasks.forEach(task => {
    if (task.parentId) {
      map[task.parentId]?.children.push(map[task.id]);
    } else {
      roots.push(map[task.id]);
    }
  });

  return roots;
}

export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    // 1️⃣ Completed tasks go last
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // 2️⃣ Both same completion state → sort by due date
    const dateA = a.dueDate ? new Date(a.dueDate) : null;
    const dateB = b.dueDate ? new Date(b.dueDate) : null;

    // No due date goes last
    if (!dateA && dateB) return 1;
    if (dateA && !dateB) return -1;
    if (!dateA && !dateB) return 0;

    // Earlier due date first (more urgent)
    return dateA - dateB;
  });
}

export function filterTasks(tasks, filter, categoryFilter="ALL") {
  let filteredTasks = tasks;
  if(categoryFilter !== "ALL") {
    filteredTasks = tasks.filter(task => task.category === categoryFilter);
  }else{
    // Exclude MYAPP category when viewing ALL
    // to prevent duplication with Backlog page
    // Need to refactor later for scalability
    filteredTasks = tasks.filter(task => task.category !== "MYAPP");
  }
  switch (filter) {
    case "ALL":
      return filteredTasks;
    case "COMPLETED":
      return filteredTasks.filter(task => task.completed);
    case "ACTIVE":
      return filteredTasks.filter(task => !task.completed);
    case "OVERDUE":
      return filteredTasks.filter(task => isTaskOverdue(task));
    default:
      return filteredTasks;
  }
}

export function todayAndOverdueTasks(tasks){
  const today = getDate()
  return tasks.filter(task => task.dueDate && task.dueDate <= today && !task.completed);
}
export function onlyTomorrowTasks(tasks){
  const tomorrow = getTomorrowDate()
  return tasks.filter(task => task.dueDate == tomorrow && !task.completed)
}

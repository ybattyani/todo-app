import { getDate } from "../utils/date";

export const PRIORITY_LEVELS = {
  low: "low",
  normal: "normal",
  high: "high",
};
export const TASK_CATEGORIES = {
  PERSONAL: {
    label: "Personal",
    color: "#6c757d",
  },
  WORK: {
    label: "Work",
    color: "#007bff",
  },
  TRAINING: {
    label: "Training",
    color: "#28a745",
  },
  COACHING: {
    label: "Coaching",
    color: "#dc3545",
  },
  OTHER: {
    label: "Other",
    color: "#343a40",
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

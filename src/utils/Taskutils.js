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

export const TASK_TEMPLATE = {
  id: "",
  text: "",
  completed: false,
  createdAt: 0,
  dueDate: 0,
  category: TASK_CATEGORIES.PERSONAL.label,
  priority: PRIORITY_LEVELS.normal,
  parentId: null,
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
export const PRIORITY_LEVELS = {
  low: "low",
  normal: "normal",
  high: "high",
};
// export const TASK_CATEGORIES = [
//   "personal",
//   "work",
//   "chores",
//   "coaching",
//   "training",
//   "others",
// ];
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
  HEALTH: {
    label: "Health",
    color: "#dc3545",
  },
  OTHER: {
    label: "Other",
    color: "#343a40",
  },
};

export const TASK_TEMPLATE = {
  id: "",
  title: "",
  completed: false,
  createdAt: 0,
  deadline: 0,
  category: TASK_CATEGORIES.PERSONAL.label,
  priority: PRIORITY_LEVELS.normal,
  parentId: null,
};

export const createTask = (input) => {
  console.log("Creating task with input:", input);
  return {
    id: crypto.randomUUID(),
    title: input.title,
    completed: false,
    createdAt: Date.now(),
    deadline: input.deadline || Date.now() + 86400000, // default deadline 24h later
    category: input.category || TASK_CATEGORIES.personal,
    priority: input.priority || PRIORITY_LEVELS.normal,
    parentId: input.parentId || null,
  };
};
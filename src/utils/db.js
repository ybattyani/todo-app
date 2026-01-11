import { collection, addDoc, onSnapshot, deleteDoc, doc ,updateDoc} from "firebase/firestore";
import { db } from "./firebase";

export function subscribeToTasks(callback) {
  const q = collection(db, "tasks");

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(tasks);
  });

  return unsubscribe;
}
export async function removeTask(id) {
    await deleteDoc(doc(db, "tasks", id));
}
export async function updateTaskInDB(task) {
    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, task);
}
export async function addTaskToDB(task) {
    await addDoc(collection(db, "tasks"), {
        text: task.text,
        createdAt: task.createdAt,
        completed: false,
        dueDate: task.dueDate,
        category: task.category,
        priority: task.priority,
        parentId: task.parentId || null,
      });
}

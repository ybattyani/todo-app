import { collection, addDoc, onSnapshot, deleteDoc, doc ,updateDoc,writeBatch,query,getDocs,where} from "firebase/firestore";
import { db } from "./firebase";
// import { getAllChildren } from "../utils/Taskutils";

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
        description: task.description || null,
      });
}
export async function toggleCompleteTaskWithChildren(taskId,completed) {
  const batch = writeBatch(db);

  // 1️⃣ Update parent
  const parentRef = doc(db, "tasks", taskId);
  batch.update(parentRef, { completed: completed });

  // 2️⃣ Fetch all descendants
  const children = await getAllChildrenFromFirebase(db, taskId);

  // 3️⃣ Update descendants
  children.forEach(child => {
    const childRef = doc(db, "tasks", child.id);
    batch.update(childRef, { completed: completed });
  });

  await batch.commit();
}
async function getAllChildrenFromFirebase(db, parentId) {
  const q = query(
    collection(db, "tasks"),
    where("parentId", "==", parentId)
  );

  const snapshot = await getDocs(q);

  let children = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Recursively fetch grandchildren
  for (const child of children) {
    const grandChildren = await getAllChildrenFromFirebase(db, child.id);
    children = children.concat(grandChildren);
  }

  return children;
}

export function subscribeToItems(callback) {
  const q = collection(db, "items");

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(tasks);
  });

  return unsubscribe;
}
export async function addItemToDB(item) {
    await addDoc(collection(db, "items"), {
        name: item.name,
        completed: false,
        category: item.category,
        quantity: item.quantity,
      });
}
export async function updateItemInDB(item) {
    const itemRef = doc(db, "items", item.id);
    await updateDoc(itemRef, item);
}
export async function resetAllItemsInDB() {
  const snapshot = await getDocs(collection(db, "items"));
  const batch = writeBatch(db);

  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, { completed: false });
  });

  await batch.commit();
}
export async function deleteAllItemsFromDB() {
  const snapshot = await getDocs(collection(db, "items"));
  const batch = writeBatch(db);

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}
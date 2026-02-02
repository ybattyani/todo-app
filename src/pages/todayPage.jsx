import { useState, useEffect } from "react";
import { AddTaskButton } from "../models/TaskList";
import TaskCreateModal from "../models/TaskCreationModal";
import TaskModal from "../models/Task";
import { todayAndOverdueTasks,sortTasks, onlyTomorrowTasks } from "../utils/Taskutils";
import {showGroceryTask} from "../models/grocery/groceryItem"
import { subscribeToTasks,addTaskToDB,subscribeToItems } from "../utils/db";

export default function todayPage() {
  const [tasks, setTasks] = useState([]);
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToday, setIsToday] = useState(true)
  const todayTasks = sortTasks(todayAndOverdueTasks(tasks))
  const tomorrowTasks = sortTasks(onlyTomorrowTasks(tasks))

  useEffect(() => {
    const unsubscribe = subscribeToTasks(setTasks);
    const unsubscribeitems = subscribeToItems(setItems);  
    return () => unsubscribe();
  }, []);

  async function handleSaveTask(task) {
    // CREATE
    setTasks((prev) => [...prev, task]);
    await addTaskToDB(task);
  };

  return (
    <div className="page">
      <h1>{isToday ? "Today": "Tomorrow"}</h1>
      <p>Here is today's list of task</p>
      <div className="modal-buttons">
        <button
          className="task-add-btn"
          onClick={() => setIsToday((prev) => !prev)}
          data-cy="change-day-button"
        >
          {isToday ? "Show Tomorrow" : "Show Today"}
        </button>
        {AddTaskButton(()=>setIsModalOpen(true))}

      </div>
      {isModalOpen && <TaskCreateModal
        task={null}
        isEditMode={false}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />}
        {(isToday ? todayTasks : tomorrowTasks).length === 0 && <div>Congrats nothing to do!</div>}
      <ul>
        {showGroceryTask(items,"FULL")}
        {(isToday ? todayTasks : tomorrowTasks).map((task) => (
          <TaskModal key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
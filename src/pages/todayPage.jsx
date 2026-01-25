import { useState, useEffect } from "react";
import { AddTaskButton } from "../models/TaskList";
import TaskCreateModal from "../models/TaskCreationModal";
import TaskModal from "../models/Task";
import { onlyTodaysTasks,sortTasks } from "../utils/Taskutils";
import { subscribeToTasks } from "../utils/db";

export default function todayPage() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredTasks = (sortTasks(onlyTodaysTasks(tasks)));

  useEffect(() => {
    const unsubscribe = subscribeToTasks(setTasks);
    return () => unsubscribe();
  }, []);
  async function handleSaveTask(task) {
    // CREATE
    setTasks((prev) => [...prev, task]);
    await addTaskToDB(task);
  };

  return (
    <div className="page morning-flow">
      <h1>Today</h1>
      <p>Here is today's list of task</p>
      {AddTaskButton(()=>setIsModalOpen(true))}
      {isModalOpen && <TaskCreateModal
        task={null}
        isEditMode={false}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />}
      {filteredTasks.length === 0 && <div>Congrats nothing to do today</div>}
      <ul>
        {filteredTasks.map(task => (
          <TaskModal key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
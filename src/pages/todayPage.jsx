import { useState, useEffect } from "react";
import { AddTaskButton } from "../models/TaskList";
import TaskCreateModal from "../models/TaskCreationModal";
import TaskModal from "../models/Task";
import { todayAndOverdueTasks,sortTasks, onlyTomorrowTasks } from "../utils/Taskutils";
import { subscribeToTasks,addTaskToDB } from "../utils/db";

export default function todayPage() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToday, setIsToday] = useState(true)
  const filteredTasks = (sortTasks(todayAndOverdueTasks(tasks)));

  useEffect(() => {
    const unsubscribe = subscribeToTasks(setTasks);
    setTasks((sortTasks(todayAndOverdueTasks(tasks))))
    return () => unsubscribe();
  }, []);
  async function handleSaveTask(task) {
    // CREATE
    setTasks((prev) => [...prev, task]);
    await addTaskToDB(task);
  };
  const handleDayChange = () => {
    setIsToday(!isToday)
    if(isToday){
       setTasks((sortTasks(todayAndOverdueTasks(tasks))))
}else{
  setTasks((sortTasks(onlyTomorrowTasks(tasks))))
}
}

  return (
    <div className="page morning-flow">
      <h1>Today</h1>
      <p>Here is today's list of task</p>
      <button onClick={handleDayChange}>change day</button>
      {AddTaskButton(()=>setIsModalOpen(true))}
      {isModalOpen && <TaskCreateModal
        task={null}
        isEditMode={false}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />}
      {tasks.length === 0 && <div>Congrats nothing to do today</div>}
      <ul>
        {tasks.map(task => (
          <TaskModal key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
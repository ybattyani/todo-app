import { useState, useEffect } from "react";
import TaskCreateModal from "../models/TaskCreationModal";
import TaskModal from "../models/Task";
import { TASK_CATEGORIES,buildTaskTree,sortTasks,filterTasks } from "../utils/Taskutils";
import { subscribeToTasks,addTaskToDB } from "../utils/db";
import '../App.css'

export default function TaskList(category="ALL", displayType="FULL") {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('ACTIVE');
  const [categoryFilter, setCategoryFilter] = useState(category);
  const taskTree = buildTaskTree(sortTasks(tasks));
  const visibleTasks = filterTasks(taskTree, filter,categoryFilter);

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
    <div>
      {AddTaskButton(()=>setIsModalOpen(true))}
      {FiltersTaskDropDown(filter,setFilter,categoryFilter,setCategoryFilter,displayType)}

      {isModalOpen && <TaskCreateModal
        task={category==="ALL" ? {} : {category:category}}
        isEditMode={false}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />}
      <ul>
        {visibleTasks.map(task => (
          <TaskModal key={task.id} task={task} displayType={displayType} />
        ))}
      </ul>
    </div>
  );
}

export function AddTaskButton(onClick) {
  return (      
    <div> 
      <button onClick={() => onClick()} className="task-add-btn">
        Add Task
      </button>
    </div>
  )
}

export function FiltersTaskDropDown(filter,setFilter,categoryFilter,setCategoryFilter,displayType){
  if(displayType==="GROCERY"){
    return
  }
  if(displayType==="SHORT"){
    return (
      <div className="filter-bar">
        Filters:
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          >
          <option value="ALL">All Tasks</option>
          <option value="ACTIVE">Active</option>
          <option value="OVERDUE">Overdue</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
    )
  }
  return (
    <div className="filter-bar">
      <div>
        Filters:
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          >
          <option value="ALL">All Tasks</option>
          <option value="ACTIVE">Active</option>
          <option value="OVERDUE">Overdue</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
      <div>
        Categories:
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          {Object.entries(TASK_CATEGORIES).map(([key, value]) => (
          <option key={key} value={key}>
            {value.label}
          </option>
          ))}
        </select>
      </div>
    </div>
  )
}
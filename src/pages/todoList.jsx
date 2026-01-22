import TaskList from "../models/TaskList";

export default function ToDoList() {
  return (
    <div className="page todo-list">
      <h1>To Do List</h1>
      {TaskList()}
    </div>
  );
}
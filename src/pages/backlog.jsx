import TaskList from "../models/TaskList";

export default function Backlog() {
  return (
    <div className="page backlog">
      <h1>Backlog</h1>
      <p>Your backlog items go here 📝</p>
      {TaskList("MYAPP")}
    </div>
  );
}
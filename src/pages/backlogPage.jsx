import TaskList from "../models/TaskList";

export default function Backlog() {
  return (
    <div className="page backlog">
      <h1>Backlog</h1>
      <p>Your MyApp task backlog items go here 📝</p>
      {TaskList("MYAPP", "SHORT")}
    </div>
  );
}
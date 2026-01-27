import { useState, useEffect } from "react";
import './groceryitem.css'

export default function GroceryItem({item}) {
  const [completed, setCompleted] = useState(item.completed);

  useEffect(() => {
    setCompleted(item.completed);
  }, [item]);
  const toggleCompleted = () => {
    setCompleted(!completed);
    item.completed = !item.completed
    console.log(item)
  };
  return (
    <>
      <li 
        key={item.id}
        className="item-row"
      >
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => toggleCompleted()}
        />
        <div className={`item-content ${item.completed ? "completed" : ""}`}>
          <span>{item.name}</span>

        </div>
      </li>
    </>
);
}
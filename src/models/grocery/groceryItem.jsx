import { useState, useEffect } from "react";
import { updateItemInDB } from "../../utils/db";
import './groceryitem.css'

export default function GroceryItem({item}) {
  const [completed, setCompleted] = useState(item.completed);

  useEffect(() => {
    setCompleted(item.completed);
  }, [item]);
  const toggleCompleted = () => {
    setCompleted(!completed);
    item.completed = !item.completed
    updateItemInDB(item)
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
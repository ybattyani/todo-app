import { useState, useEffect } from "react";
import { updateItemInDB } from "../../utils/db";
import {createTask} from "../../utils/Taskutils";
import TaskModal from "../Task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import './groceryitem.css'

export default function GroceryItem({item,onToggleCompleted}) {
  // const [completed, setCompleted] = useState(item.completed);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // useEffect(() => {
  //   setCompleted(item.completed);
  // }, [item]);
  // const toggleCompleted = () => {
  //   setCompleted(!completed);
  //   item.completed = !item.completed
  //   updateItemInDB(item)
  //   console.log(item)
  // };
  return (
    <li 
      key={item.id}
      className={`item-row ${item.completed ? "completed" : ""}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggleCompleted(item.id)}
        onPointerDown={(e) => e.stopPropagation()}
      />
      <div
        className={`item-content ${item.completed ? "completed" : ""}`}
        {...listeners}
      >
        <span>{item.name}</span>
      </div>
    </li>
);
}

export function showGrocery(items,displayType='FULL') {
    if(items.length===0){
      return false
    }
    return (
      <TaskModal key={items[0].id} task={createTask({text:"Grocery List"})} displayType={displayType} />
    )
  }
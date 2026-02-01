import { useState, useEffect } from "react";
import GroceryItem from "../models/grocery/groceryItem"
import { subscribeToItems,addItemToDB,resetAllItemsInDB,deleteAllItemsFromDB,updateItemInDB } from "../utils/db";
import { createItem,sortItems } from "../utils/itemUtils";
import { RotateCw,Trash2 } from "lucide-react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

// import SortableItem from "./SortableItem";

import "./groceryPage.css"

export default function GroceryPage(){
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const organizedItems = sortItems(items)

  useEffect(() => {
    const unsubscribe = subscribeToItems(setItems);
    return () => unsubscribe();
  }, []);

  async function handleAdd() {
    if (!value.trim()) return;
    const newItem = createItem({name:value,completed:false})
    setItems((prev)=>[...prev,newItem])
    setValue("");
    await addItemToDB(newItem)
  };
  async function uncheckAll() {
    setItems((prev) =>
    prev.map((item) => ({
      ...item,
      completed: false,
    }))
  );

  await resetAllItemsInDB();
  }
  async function deleteAll() {
    const confirmDelete = window.confirm(
    "Are you sure you want to delete all items?"
  );
  if (!confirmDelete) return;

  // Instant UI update
  setItems([]);

  await deleteAllItemsFromDB();
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setItems((items) => {
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  }
  function toggleItemCompleted(id) {
    console.log("Toggling item with id:", id);
    setItems((prev) => {
      const updated = prev.map(item =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      );

      return sortItems(updated);
    });
    const updatedItem = items.find(i => i.id === id);
    updateItemInDB({ ...updatedItem, completed: !updatedItem.completed });
  }

  return (
    <div className="page grocery-list">
      <h1>Grocery List</h1>
      <p>your grocery list for today</p>
      <div className="button-row">
        <button onClick={uncheckAll}><RotateCw/></button>
        <button onClick={deleteAll}><Trash2/></button>
      </div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map(i => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {organizedItems.map((item) => (
              <GroceryItem item={item} key={item.id} onToggleCompleted={toggleItemCompleted}/>
            ))}
          {/* Inline add row */}
            <li className="simple-list-add">
              <input
                data-cy="item_input"
                type="text"
                placeholder="Add item…"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
              <button onClick={handleAdd} className="add_item_button">+</button>
            </li>
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}

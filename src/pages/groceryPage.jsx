import { useState, useEffect } from "react";
import GroceryItem from "../models/grocery/groceryItem"
import { subscribeToItems,addItemToDB,resetAllItemsInDB,deleteAllItemsFromDB } from "../utils/db";
import { createItem,sortItems } from "../utils/itemUtils";
import { RotateCw,Trash2 } from "lucide-react";
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
  
  return (
    <div className="page grocery-list">
      <h1>Grocery List</h1>
      <p>your grocery list for today</p>
      <div className="button-row">
        <button onClick={uncheckAll}><RotateCw/></button>
        <button onClick={deleteAll}><Trash2/></button>
      </div>
      <ul>
        {organizedItems.map((item) => (
          <GroceryItem item={item} key={item.id}/>
        ))}
      {/* Inline add row */}
        <li className="simple-list-add">
          <input
            type="text"
            placeholder="Add item…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button onClick={handleAdd}>+</button>
        </li>
      </ul>
    </div>
  );
}

import GroceryItem from "../models/grocery/groceryItem"


export default function GroceryPage(){
  const items = [{id:1,completed:false,name:"Bread"},{id:2,completed:false,name:"Apples"}]
  return (
    <div className="page grocery-list">
      <h1>Grocery List</h1>
      <p>your grocery list for today</p>
      {items.map(item=>(
        <GroceryItem item={item}/>

      ))}
    </div>
  );
}

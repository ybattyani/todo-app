export const createItem = (input) => {
  console.log("Creating item with input:", input);
  // validate input fields
  return {
    id: crypto.randomUUID(),
    name: input.name,
    completed: false,
    category: input.category || "OTHER",
    quantity: input.quantity || 0,
  };
};

export function sortItems(items) {
  return [...items].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );
}
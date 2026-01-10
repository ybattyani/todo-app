export const getDate = () => {
  const date = new Date();
  return date.toISOString().split("T")[0];
}

export const formatShortDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

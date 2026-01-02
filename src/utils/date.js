export const formatDayDate = (timestamp) => {
  const date = new Date(timestamp);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

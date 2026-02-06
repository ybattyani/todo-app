export function TDSelectObjectButton({ onChange, title, isSelected, options }) {
  return (
    <>
      <div className="td-select-button-title">{title}:</div>
      <select
        value={isSelected}
        onChange={onChange}
        data-cy={'select-' + title}
      >
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={key}>
            {value.label}
          </option>
        ))}
      </select>
    </>
  );
}
export function DateSelector({ onChange, title, isSelected }) {
  return (
    <>
      <div className="td-select-button-title">{title}:</div>
      <label className="form-label">
        <input
          type="date"
          value={isSelected}
          onChange={onChange}
          className="task-date-input"
          />
      </label>
    </>
  )
}
export function TaskSelectorButton({ onChange, title, isSelected, tasks }) {
  return (
    <>
      <div className="td-select-button-title">{title}:</div>
      <select
        value={isSelected}
        onChange={onChange}
        data-cy={'select-' + title}
      >
        <option value="">No parent</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.text}
          </option>
        ))}
      </select>
    </>
  );
}

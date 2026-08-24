import { memo } from "react";
import { Link } from "react-router-dom";

const TaskRow = memo(function TaskRow({ task, onToggle }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #444",
        background: task.completed ? "#1a2e1a" : "transparent",
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => onToggle(task.id, e.target.checked)}
      />
      <Link
        to={`/tasks/${task.id}`}
        style={{ flex: 1, color: "#8ab4f8", textDecoration: "none" }}
      >
        {task.title}
      </Link>
      <span style={{ fontSize: "12px", color: task.completed ? "#4caf50" : "#f0ad4e" }}>
        {task.completed ? "Done" : "Pending"}
      </span>
    </div>
  );
});

export default TaskRow;

import { useParams, Link } from "react-router-dom";
import { useTask } from "../api/tasksApi";

export default function TaskDetail() {
  const { id } = useParams();
  const { data: task, isLoading, error } = useTask(id);

  if (isLoading) return <p style={{ padding: "20px" }}>Loading task details...</p>;
  if (error || !task) return <p style={{ padding: "20px" }}>Task not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/tasks" style={{ color: "#8ab4f8" }}>← Back to Tasks</Link>
      <h1 style={{ marginTop: "15px" }}>{task.title}</h1>
      <p>
        Status:{" "}
        <strong style={{ color: task.completed ? "#4caf50" : "#f0ad4e" }}>
          {task.completed ? "Done" : "Pending"}
        </strong>
      </p>
    </div>
  );
}

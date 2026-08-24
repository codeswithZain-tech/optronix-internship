import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useTasks, useUpdateTask } from "../api/tasksApi";
import { useUIStore } from "../store/useUIStore";
import TaskRow from "../components/TaskRow";

export default function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const statusFilter = useUIStore((s) => s.statusFilter);
  const setStatusFilter = useUIStore((s) => s.setStatusFilter);
  const sortKey = useUIStore((s) => s.sortKey);
  const setSortKey = useUIStore((s) => s.setSortKey);

  const { data: tasks, isLoading, error } = useTasks();
  const { mutate: updateTask } = useUpdateTask();

  const handleToggle = useCallback(
    (id, completed) => {
      updateTask({ id, completed });
    },
    [updateTask]
  );

  const visibleTasks = useMemo(() => {
    if (!tasks) return [];

    let result = tasks.filter((t) =>
      t.title.toLowerCase().includes(q.toLowerCase())
    );

    if (statusFilter === "pending") result = result.filter((t) => !t.completed);
    if (statusFilter === "done") result = result.filter((t) => t.completed);

    return [...result].sort((a, b) => {
      if (sortKey === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortKey === "status") {
        return Number(b.completed) - Number(a.completed);
      }
      return 0;
    });
  }, [tasks, q, statusFilter, sortKey]);

  if (isLoading) return <p style={{ padding: "20px" }}>Loading tasks...</p>;
  if (error) return <p style={{ padding: "20px" }}>Error loading tasks.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tasks</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="Search tasks..."
          value={q}
          onChange={(e) => setSearchParams({ q: e.target.value })}
          style={{ padding: "8px", flex: 1 }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="title">Sort by Title</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      <div style={{ border: "1px solid #444", borderRadius: "6px", overflow: "hidden" }}>
        {visibleTasks.length === 0 ? (
          <p style={{ padding: "15px" }}>No tasks found.</p>
        ) : (
          visibleTasks.map((task) => (
            <TaskRow key={task.id} task={task} onToggle={handleToggle} />
          ))
        )}
      </div>
    </div>
  );
}

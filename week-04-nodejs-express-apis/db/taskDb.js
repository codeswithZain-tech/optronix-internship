// ============ SEED USERS ============
export let users = [
  { id: 1, name: "Ali Khan", email: "ali@example.com" },
  { id: 2, name: "Sara Ahmed", email: "sara@example.com" },
  { id: 3, name: "Zain Malik", email: "zain@example.com" }
];
// ============ SEED TASKS ============
export let tasks = [
  { id: 1, title: "Design homepage", description: "Create wireframes", status: "pending", assigneeId: 1, dueDate: "2026-09-05", createdAt: "2026-08-20T10:00:00.000Z" },
  { id: 2, title: "Setup database", description: "Configure MongoDB", status: "in-progress", assigneeId: 2, dueDate: "2026-09-02", createdAt: "2026-08-21T10:00:00.000Z" },
  { id: 3, title: "Write API docs", description: "Document all endpoints", status: "pending", assigneeId: 1, dueDate: "2026-09-10", createdAt: "2026-08-22T10:00:00.000Z" },
  { id: 4, title: "Fix login bug", description: "Token expiry issue", status: "completed", assigneeId: 3, dueDate: "2026-08-25", createdAt: "2026-08-19T10:00:00.000Z" },
  { id: 5, title: "Deploy to staging", description: "Push latest build", status: "in-progress", assigneeId: 2, dueDate: "2026-09-01", createdAt: "2026-08-23T10:00:00.000Z" }
];
// ============ TASK DB OPERATIONS ============
export function findAllTasks() {
  return tasks;
}
export function findTaskById(id) {
  return tasks.find((t) => t.id === id);
}
export function insertTask(task) {
  tasks.push(task);
  return task;
}
export function updateTaskById(id, data) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  Object.assign(task, data);
  return task;
}
export function deleteTaskById(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
// ============ USER DB OPERATIONS ============
export function findAllUsers() {
  return users;
}
export function findUserById(id) {
  return users.find((u) => u.id === id);
}
export function insertUser(user) {
  users.push(user);
  return user;
}
export function updateUserById(id, data) {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  Object.assign(user, data);
  return user;
}
export function deleteUserById(id) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}
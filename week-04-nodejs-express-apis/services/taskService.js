import { findAllTasks, findTaskById, insertTask, updateTaskById, deleteTaskById } from '../db/taskDb.js';
import { findUserById } from '../db/taskDb.js';

function notFoundError(message) {
  const err = new Error(message);
  err.statusCode = 404;
  return err;
}

// ============ GET ALL — filter by status/assignee/date range ============
export async function getAll({ status, assigneeId, dueBefore, dueAfter, page, limit }) {
  let result = [...findAllTasks()];
  // Filter by status
  if (status) {
    result = result.filter((t) => t.status === status);
  }
  // Filter by assignee
  if (assigneeId) {
    result = result.filter((t) => t.assigneeId === Number(assigneeId));
  }
  // Filter by due date range
  if (dueAfter) {
    result = result.filter((t) => new Date(t.dueDate) >= new Date(dueAfter));
  }
  if (dueBefore) {
    result = result.filter((t) => new Date(t.dueDate) <= new Date(dueBefore));
  }

  // Pagination
  const pageNum = Number(page) || 1;
  const limitNum = Math.min(Number(limit) || 20, 100);
  const total = result.length;
  const totalPages = Math.ceil(total / limitNum);
  const startIndex = (pageNum - 1) * limitNum;
  return {
    data: result.slice(startIndex, startIndex + limitNum),
    total,
    page: pageNum,
    totalPages
  };
}

export async function getById(id) {
  const task = findTaskById(Number(id));
  if (!task) throw notFoundError("Task not found");
  return task;
}

export async function create(data) {
  // Check assignee exists
  const assigneeExists = findUserById(Number(data.assigneeId));
  if (!assigneeExists) {
    const err = new Error("assigneeId does not match any existing user");
    err.statusCode = 422;
    throw err;
  }
  const newTask = {
    id: Date.now(),
    title: data.title,
    description: data.description || "",
    status: data.status || "pending",
    assigneeId: Number(data.assigneeId),
    dueDate: data.dueDate,
    createdAt: new Date().toISOString()
  };
  return insertTask(newTask);
}

export async function update(id, data) {
  const updated = updateTaskById(Number(id), {
    title: data.title,
    description: data.description,
    status: data.status,
    assigneeId: Number(data.assigneeId),
    dueDate: data.dueDate
  });
  if (!updated) throw notFoundError("Task not found");
  return updated;
}

export async function remove(id) {
  const deleted = deleteTaskById(Number(id));
  if (!deleted) throw notFoundError("Task not found");
  return true;
}
import { findAllUsers, findUserById, insertUser, updateUserById, deleteUserById } from '../db/taskDb.js';
import { findAllTasks } from '../db/taskDb.js';

function notFoundError(message) {
  const err = new Error(message);
  err.statusCode = 404;
  return err;
}

export async function getAll() {
  return findAllUsers();
}

export async function getById(id) {
  const user = findUserById(Number(id));
  if (!user) throw notFoundError("User not found");
  return user;
}

export async function create(data) {
  const newUser = {
    id: Date.now(),
    name: data.name,
    email: data.email
  };
  return insertUser(newUser);
}

export async function update(id, data) {
  const updated = updateUserById(Number(id), {
    name: data.name,
    email: data.email
  });
  if (!updated) throw notFoundError("User not found");
  return updated;
}

export async function remove(id) {
  // prevent deleting a user who has assigned tasks
  const tasks = findAllTasks();
  const hasTasks = tasks.some((t) => t.assigneeId === Number(id));

  if (hasTasks) {
    const err = new Error("Cannot delete user with assigned tasks");
    err.statusCode = 409;
    throw err;
  }

  const deleted = deleteUserById(Number(id));
  if (!deleted) throw notFoundError("User not found");
  return true;
}
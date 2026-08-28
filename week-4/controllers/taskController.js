import asyncHandler from '../utils/asyncHandler.js';
import * as taskService from '../services/taskService.js';

export const getTasks = asyncHandler(async (req, res) => {
  const { status, assigneeId, dueBefore, dueAfter, page, limit } = req.query;
  const result = await taskService.getAll({ status, assigneeId, dueBefore, dueAfter, page, limit });
  res.status(200).json(result);
});

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getById(req.params.id);
  res.status(200).json(task);
});

export const createTask = asyncHandler(async (req, res) => {
  const newTask = await taskService.create(req.body);
  res.status(201).json(newTask);
});

export const updateTask = asyncHandler(async (req, res) => {
  const updated = await taskService.update(req.params.id, req.body);
  res.status(200).json(updated);
});

export const deleteTask = asyncHandler(async (req, res) => {
  await taskService.remove(req.params.id);
  res.status(204).send();
});
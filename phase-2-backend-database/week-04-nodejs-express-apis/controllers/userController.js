import asyncHandler from '../utils/asyncHandler.js';
import * as userService from '../services/userService.js';

export const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAll();
  res.status(200).json(users);
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getById(req.params.id);
  res.status(200).json(user);
});

export const createUser = asyncHandler(async (req, res) => {
  const newUser = await userService.create(req.body);
  res.status(201).json(newUser);
});

export const updateUser = asyncHandler(async (req, res) => {
  const updated = await userService.update(req.params.id, req.body);
  res.status(200).json(updated);
});

export const deleteUser = asyncHandler(async (req, res) => {
  await userService.remove(req.params.id);
  res.status(204).send();
});
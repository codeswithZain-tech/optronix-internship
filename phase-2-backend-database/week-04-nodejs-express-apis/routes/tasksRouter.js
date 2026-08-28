import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { taskValidationRules, validate } from '../middleware/validators.js';

const router = express.Router();

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskValidationRules, validate, taskController.createTask);
router.put('/:id', taskValidationRules, validate, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
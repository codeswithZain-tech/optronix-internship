import express from 'express';
import * as userController from '../controllers/userController.js';
import { userValidationRules, validate } from '../middleware/validators.js';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userValidationRules, validate, userController.createUser);
router.put('/:id', userValidationRules, validate, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
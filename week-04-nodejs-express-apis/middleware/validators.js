import { body, validationResult } from 'express-validator';

// ============ TASK validation ============
export const taskValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 150 }).withMessage('Title must be 3-150 characters'),

  body('description')
    .optional()
    .isLength({ max: 1000 }).withMessage('Description max 1000 characters'),

  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be pending, in-progress, or completed'),

  body('assigneeId')
    .notEmpty().withMessage('assigneeId is required')
    .isInt().withMessage('assigneeId must be a number'),

  body('dueDate')
    .notEmpty().withMessage('dueDate is required')
    .isISO8601().withMessage('dueDate must be a valid date (YYYY-MM-DD)')
];

// ============ USER validation ============
export const userValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
];

// ============ SHARED validate middleware ============
export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: "Validation failed",
      details: errors.array().map((e) => ({ field: e.path, message: e.msg }))
    });
  }

  next();
}
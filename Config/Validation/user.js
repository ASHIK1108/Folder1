const { body, validationResult } = require('express-validator');

// Validation rules
const validateUserInput = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Invalid email format'),
    body('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .matches(/^[0-9]{10}$/)
        .withMessage('Phone number must be 10 digits'),
    body('address')
        .notEmpty()
        .isLength({ max: 100 })
        .withMessage('Address cannot exceed 100 characters'),
        body('password')
        .isLength({ min: 6 })  // Ensure the password is at least 6 characters long
        .withMessage('Password must be at least 6 characters long')
        .matches(/[a-zA-Z]/)  // Ensure the password has at least one letter
        .withMessage('Password must contain at least one letter')
        .matches(/[0-9]/)  // Ensure the password has at least one number
        .withMessage('Password must contain at least one number'),
    body('website')
        .optional()
        .isURL()
        .withMessage('Invalid website URL'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ succed:false,errors: errors.array() });
    }
    next();
};

module.exports = { validateUserInput, handleValidationErrors };

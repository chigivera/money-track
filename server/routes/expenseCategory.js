const express = require('express');
const router = express.Router();
const {
    createExpenseCategory,
    getExpenseCategories,
    getExpenseCategoryById,
    updateExpenseCategory,
    deleteExpenseCategory,
} = require('../controllers/expense');

// Create a new expense category
router.post('/', createExpenseCategory);

// Get all expense categories
router.get('/', getExpenseCategories);

// Get an expense category by ID
router.get('/:categoryId', getExpenseCategoryById);

// Update an expense category
router.put('/:categoryId', updateExpenseCategory);

// Delete an expense category
router.delete('/:categoryId', deleteExpenseCategory);

module.exports = router;

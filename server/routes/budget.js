const express = require('express');
const router = express.Router();
const {
    createBudget,
    getBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
} = require('../controllers/budgets');

// Create a new budget
router.post('/', createBudget);

// Get all budgets for a user
router.get('/:user_id', getBudgets);

// Get a budget by ID
router.get('/:budgetId', getBudgetById);

// Update a budget
router.put('/:budgetId', updateBudget);

// Delete a budget
router.delete('/:budgetId', deleteBudget);

module.exports = router;

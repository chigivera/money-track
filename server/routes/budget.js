const express = require('express');
const router = express.Router();
const {
    createBudget,
    getBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
} = require('../controllers/budgets');
const { uploadBudgets } = require('../controllers/fileUpload');
const { upload } = require('../middlewares/fileUpload');

// Create a new budget
router.post('/', createBudget);

// Get all budgets for a user
router.get('/', getBudgets);

// Get a budget by ID
router.get('/:budgetId', getBudgetById);

// Update a budget
router.put('/:budgetId', updateBudget);

// Delete a budget
router.delete('/:budgetId', deleteBudget);

router.post('/upload', upload.single('file'), uploadBudgets);


module.exports = router;

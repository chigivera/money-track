const express = require('express');
const router = express.Router();
const {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactions');

// Create a new transaction
router.post('/', createTransaction);

// Get all transactions for a user
router.get('/:user_id', getTransactions);

// Get a transaction by ID
router.get('/:transactionId', getTransactionById);

// Update a transaction
router.put('/:transactionId', updateTransaction);

// Delete a transaction
router.delete('/:transactionId', deleteTransaction);

module.exports = router;

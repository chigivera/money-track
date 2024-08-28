const express = require('express');
const router = express.Router();
const {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactions');
const { upload } = require('../middlewares/fileUpload');
const { uploadTransactions } = require('../controllers/fileUpload');

// Create a new transaction
router.post('/', createTransaction);

// Get all transactions for a user
router.get('/', getTransactions);

// Get a transaction by ID
router.get('/:transactionId', getTransactionById);

// Update a transaction
router.put('/:transactionId', updateTransaction);

// Delete a transaction
router.delete('/:transactionId', deleteTransaction);

router.post('/upload', upload.single('file'), uploadTransactions);


module.exports = router;

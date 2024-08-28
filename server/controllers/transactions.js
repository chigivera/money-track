const Transaction = require('../models/Transaction');
const { verifyToken } = require('../utils/jwt');

// Create a new transaction
const createTransaction = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const { amount, description, category_id, date, type } = req.body;

    try {
        const decoded = verifyToken(token);
        const user_id = decoded.userId;
        const transaction = new Transaction({
            user_id,
            amount,
            description,
            category_id,
            date,
            type,
        });

        await transaction.save();
        return res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (error) {
        console.error('Error creating transaction:', error);
        return res.status(500).json({ error: 'Failed to create transaction' });
    }
};

// Get all transactions for a user
const getTransactions = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    try {
        const decoded = verifyToken(token);
        const userId = decoded.userId;
    
        const transactions = await Transaction.find({ user_id: userId }).populate('category_id');
     
    
        return res.status(200).json([ ...transactions ]);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ error: 'Failed to fetch transactions' });
    }
    
    };

// Get a transaction by ID
const getTransactionById = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const transaction = await Transaction.findById(transactionId).populate('category_id');
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        return res.status(200).json({ transaction });
    } catch (error) {
        console.error('Error fetching transaction by ID:', error);
        return res.status(500).json({ error: 'Failed to fetch transaction' });
    }
};

// Update a transaction
const updateTransaction = async (req, res) => {
    const { transactionId } = req.params;
    const { amount, description, category_id, date, type } = req.body;

    try {
        const transaction = await Transaction.findByIdAndUpdate(
            transactionId,
            { amount, description, category_id, date, type },
            { new: true, runValidators: true }
        );

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        return res.status(200).json({ message: 'Transaction updated successfully', transaction });
    } catch (error) {
        console.error('Error updating transaction:', error);
        return res.status(500).json({ error: 'Failed to update transaction' });
    }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const transaction = await Transaction.findByIdAndDelete(transactionId);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        return res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        return res.status(500).json({ error: 'Failed to delete transaction' });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
};

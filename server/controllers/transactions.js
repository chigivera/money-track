const Transaction = require('../models/Transaction');
const { verifyToken } = require('../utils/jwt');

// Create a new transaction
const createTransaction = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const { amount, description, date, type, budget_id } = req.body;

    try {
        const decoded = verifyToken(token);
        const user_id = decoded.userId;
        const transaction = new Transaction({
            user_id,
            amount,
            description,
            date,
            type,
            budget_id
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
    const page = parseInt(req.query.page) || 1;  // Get page from query parameters or default to 1
    const limit = parseInt(req.query.limit) || 10;  // Get limit from query parameters or default to 10
    const skip = (page - 1) * limit;  // Calculate skip for pagination
    const startDate = req.query.startDate;  // Get startDate from query parameters
    const endDate = req.query.endDate;  // Get endDate from query parameters
    const budget_id = req.query.budget_id;  // Get endDate from query parameters

    try {
      const decoded = verifyToken(token);
      const userId = decoded.userId;
  
      // Build the query object with optional date filtering
      const query = { user_id: userId };
  
      if (startDate && endDate) {
        query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };  // Apply date range filtering
      }
      if(budget_id) {
        query.budget_id = budget_id
      }
      // Fetch transactions with pagination
      const transactions = await Transaction.find(query)
        .skip(skip)
        .limit(limit);
  
      // Get total count for pagination
      const total = await Transaction.countDocuments(query);  // Use the same query to get the total count
  
      return res.status(200).json({
        transactions,
        total,  // Return total count for frontend pagination
      });
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

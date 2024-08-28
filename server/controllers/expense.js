const ExpenseCategory = require('../models/ExpenseCategory');

// Create a new expense category
const createExpenseCategory = async (req, res) => {
    const { name, expenseType } = req.body;

    try {
        const expenseCategory = new ExpenseCategory({
            name,
            expenseType,
        });

        await expenseCategory.save();
        return res.status(201).json({ message: 'Expense category created successfully', expenseCategory });
    } catch (error) {
        console.error('Error creating expense category:', error);
        return res.status(500).json({ error: 'Failed to create expense category' });
    }
};

// Get all expense categories
const getExpenseCategories = async (req, res) => {
    try {
        const expenseCategories = await ExpenseCategory.find();
        return res.status(200).json([ ...expenseCategories ]);
    } catch (error) {
        console.error('Error fetching expense categories:', error);
        return res.status(500).json({ error: 'Failed to fetch expense categories' });
    }
};

// Get an expense category by ID
const getExpenseCategoryById = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const expenseCategory = await ExpenseCategory.findById(categoryId);
        if (!expenseCategory) {
            return res.status(404).json({ error: 'Expense category not found' });
        }
        return res.status(200).json({ expenseCategory });
    } catch (error) {
        console.error('Error fetching expense category by ID:', error);
        return res.status(500).json({ error: 'Failed to fetch expense category' });
    }
};

// Update an expense category
const updateExpenseCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name, expenseType } = req.body;

    try {
        const expenseCategory = await ExpenseCategory.findByIdAndUpdate(
            categoryId,
            { name, expenseType },
            { new: true, runValidators: true }
        );

        if (!expenseCategory) {
            return res.status(404).json({ error: 'Expense category not found' });
        }

        return res.status(200).json({ message: 'Expense category updated successfully', expenseCategory });
    } catch (error) {
        console.error('Error updating expense category:', error);
        return res.status(500).json({ error: 'Failed to update expense category' });
    }
};

// Delete an expense category
const deleteExpenseCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const expenseCategory = await ExpenseCategory.findByIdAndDelete(categoryId);
        if (!expenseCategory) {
            return res.status(404).json({ error: 'Expense category not found' });
        }
        return res.status(200).json({ message: 'Expense category deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense category:', error);
        return res.status(500).json({ error: 'Failed to delete expense category' });
    }
};

module.exports = {
    createExpenseCategory,
    getExpenseCategories,
    getExpenseCategoryById,
    updateExpenseCategory,
    deleteExpenseCategory,
};

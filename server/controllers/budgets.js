const Budget = require('../models/Budget');

// Create a new budget
const createBudget = async (req, res) => {
    const { user_id, category_id, budget_amount, budgetType, month_year, status } = req.body;

    try {
        const budget = new Budget({
            user_id,
            category_id,
            budget_amount,
            budgetType,
            month_year,
            status,
        });

        await budget.save();
        return res.status(201).json({ message: 'Budget created successfully', budget });
    } catch (error) {
        console.error('Error creating budget:', error);
        return res.status(500).json({ error: 'Failed to create budget' });
    }
};

// Get all budgets for a user
const getBudgets = async (req, res) => {
    const { user_id } = req.params;

    try {
        const budgets = await Budget.find({ user_id }).populate('category_id');
        return res.status(200).json({ budgets });
    } catch (error) {
        console.error('Error fetching budgets:', error);
        return res.status(500).json({ error: 'Failed to fetch budgets' });
    }
};

// Get a budget by ID
const getBudgetById = async (req, res) => {
    const { budgetId } = req.params;

    try {
        const budget = await Budget.findById(budgetId).populate('category_id');
        if (!budget) {
            return res.status(404).json({ error: 'Budget not found' });
        }
        return res.status(200).json({ budget });
    } catch (error) {
        console.error('Error fetching budget by ID:', error);
        return res.status(500).json({ error: 'Failed to fetch budget' });
    }
};

// Update a budget
const updateBudget = async (req, res) => {
    const { budgetId } = req.params;
    const { budget_amount, budgetType, month_year, status } = req.body;

    try {
        const budget = await Budget.findByIdAndUpdate(
            budgetId,
            { budget_amount, budgetType, month_year, status },
            { new: true, runValidators: true }
        );

        if (!budget) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        return res.status(200).json({ message: 'Budget updated successfully', budget });
    } catch (error) {
        console.error('Error updating budget:', error);
        return res.status(500).json({ error: 'Failed to update budget' });
    }
};

// Delete a budget
const deleteBudget = async (req, res) => {
    const { budgetId } = req.params;

    try {
        const budget = await Budget.findByIdAndDelete(budgetId);
        if (!budget) {
            return res.status(404).json({ error: 'Budget not found' });
        }
        return res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (error) {
        console.error('Error deleting budget:', error);
        return res.status(500).json({ error: 'Failed to delete budget' });
    }
};

module.exports = {
    createBudget,
    getBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget,
};

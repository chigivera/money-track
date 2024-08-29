const Budget = require("../models/Budget");
const { verifyToken } = require("../utils/jwt");

// Create a new budget
const createBudget = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  const { category_id, budget_amount, budgetType, month_year, status } =
    req.body;

  try {
    const decoded = verifyToken(token);
    const user_id = decoded.userId;
    const budget = new Budget({
      user_id,
      category_id,
      budget_amount,
      budgetType,
      month_year,
      status,
    });

    await budget.save();
    return res
      .status(201)
      .json({ message: "Budget created successfully", budget });
  } catch (error) {
    console.error("Error creating budget:", error);
    return res.status(500).json({ error: "Failed to create budget" });
  }
};

// Get all budgets for a user
const getBudgets = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const page = parseInt(req.query.page) || 1; // Get page from query parameters or default to 1
  const limit = parseInt(req.query.limit) || 10; // Get limit from query parameters or default to 10
  const skip = (page - 1) * limit; // Calculate skip for pagination
  const startDate = req.query.startDate; // Get startDate from query parameters
  const endDate = req.query.endDate; // Get endDate from query parameters

  try {
    const decoded = verifyToken(token);
    const userId = decoded.userId;

    // Build the query object with optional date filtering
    const query = { user_id: userId };

    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) }; // Apply date range filtering
    }

    // Fetch transactions with pagination
    const budgets = await Budget.find(query)
      .populate("category_id")
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Budget.countDocuments(query); // Use the same query to get the total count

    return res.status(200).json({
      budgets,
      total, // Return total count for frontend pagination
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// Get a budget by ID
const getBudgetById = async (req, res) => {
  const { budgetId } = req.params;

  try {
    const budget = await Budget.findById(budgetId).populate("category_id");
    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    return res.status(200).json({ budget });
  } catch (error) {
    console.error("Error fetching budget by ID:", error);
    return res.status(500).json({ error: "Failed to fetch budget" });
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
      return res.status(404).json({ error: "Budget not found" });
    }

    return res
      .status(200)
      .json({ message: "Budget updated successfully", budget });
  } catch (error) {
    console.error("Error updating budget:", error);
    return res.status(500).json({ error: "Failed to update budget" });
  }
};

// Delete a budget
const deleteBudget = async (req, res) => {
  const { budgetId } = req.params;

  try {
    const budget = await Budget.findByIdAndDelete(budgetId);
    if (!budget) {
      return res.status(404).json({ error: "Budget not found" });
    }
    return res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("Error deleting budget:", error);
    return res.status(500).json({ error: "Failed to delete budget" });
  }
};

module.exports = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};

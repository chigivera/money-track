// models/Budget.js
const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExpenseCategory',
        required: true,
    },
    budget_amount: {
        type: Number,
        required: true,
        min: 0,
    },
    budgetType: {
        type: String,
        enum: ['monthly', 'yearly'],
        required: true,
    },
    month_year: {
        type: String,
        required: true,
        match: /^\d{4}-\d{2}$/, // Format: YYYY-MM
    },
    status: {
        type: String,
        enum: ['active', 'exceeded', 'completed'],
        required: true,
    },
},{
    timestamps:true
});

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;

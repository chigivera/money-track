// models/ExpenseCategory.js
const mongoose = require('mongoose');

const expenseCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    expenseType: {
        type: String,
        enum: ['fixed', 'variable'],
        required: true,
    },
},{
    timestamps:true
});

const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);
module.exports = ExpenseCategory;

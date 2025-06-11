const Expense = require('../models/Expense');
const { calculateBalances, calculateSettlements } = require('../utils/calculations');

// Get all expenses
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.json({
            success: true,
            data: expenses,
            message: 'Expenses retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving expenses',
            error: error.message
        });
    }
};

// Add new expense
const addExpense = async (req, res) => {
    try {
        const { amount, description, paidBy, splitType, splitDetails } = req.body;

        // Create new expense
        const expense = new Expense({
            amount,
            description,
            paidBy,
            splitType: splitType || 'equal',
            splitDetails: splitDetails || new Map()
        });

        // If split type is equal, calculate shares
        if (expense.splitType === 'equal') {
            const people = Array.from(expense.splitDetails.keys());
            const shareAmount = expense.amount / people.length;
            people.forEach(person => {
                expense.splitDetails.set(person, shareAmount);
            });
        }

        await expense.save();

        res.status(201).json({
            success: true,
            data: expense,
            message: 'Expense added successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error adding expense',
            error: error.message
        });
    }
};

// Update expense
const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const expense = await Expense.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        res.json({
            success: true,
            data: expense,
            message: 'Expense updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating expense',
            error: error.message
        });
    }
};

// Delete expense
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findByIdAndDelete(id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        res.json({
            success: true,
            message: 'Expense deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error deleting expense',
            error: error.message
        });
    }
};

// Get all people involved in expenses
const getAllPeople = async (req, res) => {
    try {
        const expenses = await Expense.find();
        const people = new Set();

        expenses.forEach(expense => {
            people.add(expense.paidBy);
            expense.splitDetails.forEach((_, person) => people.add(person));
        });

        res.json({
            success: true,
            data: Array.from(people),
            message: 'People retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving people',
            error: error.message
        });
    }
};

// Get current balances
const getBalances = async (req, res) => {
    try {
        const expenses = await Expense.find();
        const balances = calculateBalances(expenses);

        const balanceArray = Array.from(balances.entries()).map(([person, amount]) => ({
            person,
            amount
        }));

        res.json({
            success: true,
            data: balanceArray,
            message: 'Balances retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error calculating balances',
            error: error.message
        });
    }
};

// Get settlement summary
const getSettlements = async (req, res) => {
    try {
        const expenses = await Expense.find();
        const balances = calculateBalances(expenses);
        const settlements = calculateSettlements(balances);

        res.json({
            success: true,
            data: settlements,
            message: 'Settlements calculated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error calculating settlements',
            error: error.message
        });
    }
};

module.exports = {
    getAllExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getAllPeople,
    getBalances,
    getSettlements
}; 
const express = require('express');
const router = express.Router();
const {
    getAllExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getAllPeople,
    getBalances,
    getSettlements
} = require('../controllers/expenseController');

// Expense routes
router.get('/expenses', getAllExpenses);
router.post('/expenses', addExpense);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);

// Settlement routes
router.get('/people', getAllPeople);
router.get('/balances', getBalances);
router.get('/settlements', getSettlements);

module.exports = router; 
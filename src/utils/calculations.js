// Calculate how much each person owes or is owed
const calculateBalances = (expenses) => {
    const balances = new Map();

    expenses.forEach(expense => {
        // Add amount to the person who paid
        const currentPaidBy = balances.get(expense.paidBy) || 0;
        balances.set(expense.paidBy, currentPaidBy + expense.amount);

        // Subtract amount from people who owe
        expense.splitDetails.forEach((amount, person) => {
            const currentBalance = balances.get(person) || 0;
            balances.set(person, currentBalance - amount);
        });
    });

    return balances;
};

// Calculate simplified settlements
const calculateSettlements = (balances) => {
    const settlements = [];
    const debtors = [];
    const creditors = [];

    // Separate people into debtors and creditors
    balances.forEach((balance, person) => {
        if (balance < 0) {
            debtors.push({ person, amount: Math.abs(balance) });
        } else if (balance > 0) {
            creditors.push({ person, amount: balance });
        }
    });

    // Sort by amount
    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    // Calculate settlements
    while (debtors.length > 0 && creditors.length > 0) {
        const debtor = debtors[0];
        const creditor = creditors[0];
        const amount = Math.min(debtor.amount, creditor.amount);

        settlements.push({
            from: debtor.person,
            to: creditor.person,
            amount: amount
        });

        debtor.amount -= amount;
        creditor.amount -= amount;

        if (debtor.amount === 0) debtors.shift();
        if (creditor.amount === 0) creditors.shift();
    }

    return settlements;
};

module.exports = {
    calculateBalances,
    calculateSettlements
}; 
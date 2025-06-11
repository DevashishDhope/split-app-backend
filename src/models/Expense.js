const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount cannot be negative']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    paidBy: {
        type: String,
        required: [true, 'Paid by is required'],
        trim: true
    },
    splitType: {
        type: String,
        enum: ['equal', 'percentage', 'exact'],
        default: 'equal'
    },
    splitDetails: {
        type: Map,
        of: Number,
        default: new Map()
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Add a method to calculate individual shares
expenseSchema.methods.calculateShares = function() {
    if (this.splitType === 'equal') {
        const totalPeople = this.splitDetails.size;
        const shareAmount = this.amount / totalPeople;
        for (let [person] of this.splitDetails) {
            this.splitDetails.set(person, shareAmount);
        }
    }
    // We'll add percentage and exact split calculations later
};

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense; 
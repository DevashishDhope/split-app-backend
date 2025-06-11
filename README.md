# Split App Backend

A robust backend API for managing shared expenses and settlements between multiple people. This application helps track who paid for what and calculates how much each person owes or is owed.

## 🚀 Live API

The API is deployed and accessible at:
```
https://split-app-backend-production-1bf1.up.railway.app
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Deployment**: Railway.app
- **API Testing**: Postman

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Postman (for API testing)

## 🔧 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/DevashishDhope/split-app-backend.git
   cd split-app-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Expenses

- **Get All Expenses**
  ```
  GET /expenses
  ```
  Returns a list of all expenses with their details.

- **Create Expense**
  ```
  POST /expenses
  ```
  Body:
  ```json
  {
    "amount": 100,
    "description": "Dinner",
    "paidBy": "Rahul",
    "splitType": "equal",
    "splitDetails": {
      "Rahul": 33.33,
      "Priya": 33.33,
      "Amit": 33.34
    }
  }
  ```

- **Update Expense**
  ```
  PUT /expenses/:id
  ```
  Updates an existing expense by ID.

- **Delete Expense**
  ```
  DELETE /expenses/:id
  ```
  Deletes an expense by ID.

#### 2. People

- **Get All People**
  ```
  GET /people
  ```
  Returns a list of all people involved in expenses.

#### 3. Balances

- **Get All Balances**
  ```
  GET /balances
  ```
  Returns the current balance for each person.

#### 4. Settlements

- **Get Settlement Suggestions**
  ```
  GET /settlements
  ```
  Returns optimized settlement transactions to clear all debts.

### Split Types

1. **Equal Split**
   - Amount is divided equally among all participants
   - Example: ₹1000 split between 3 people = ₹333.33 each

2. **Percentage Split**
   - Amount is split according to specified percentages
   - Example: 50-30-20 split of ₹1000 = ₹500, ₹300, ₹200

3. **Exact Split**
   - Amount is split according to exact amounts
   - Example: ₹1000 split as ₹400, ₹350, ₹250

## 🔍 Data Validation

The API implements comprehensive validation:

- Amount must be positive
- Description is required
- Paid by field is required
- Split details must match the split type
- All required fields are validated

## ⚠️ Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Server Error

Error responses include detailed messages:
```json
{
  "error": "Error message",
  "details": "Additional error details"
}
```

## 🧪 Testing

The API can be tested using the provided Postman collection:
[Postman Collection](https://gist.github.com/DevashishDhope/f9edf19e602a65d12015517fe5ad8736)

## 📦 Project Structure

```
split-app-backend/
├── src/
│   ├── config/
│   ├── controllers/
│   │   └── expenseController.js
│   ├── models/
│   │   └── Expense.js
│   ├── routes/
│   │   └── expenseRoutes.js
│   ├── utils/
│   │   └── calculations.js
│   └── app.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 🔄 Settlement Logic

The settlement calculation follows these steps:

1. Calculate net balance for each person
2. Identify debtors (negative balance) and creditors (positive balance)
3. Create settlement transactions to minimize the number of transfers
4. Optimize transfers to clear all debts

Example:
```
Initial Balances:
- Rahul: -₹500
- Priya: +₹300
- Amit: +₹200

Settlement:
- Rahul pays Priya ₹300
- Rahul pays Amit ₹200
```

## ⚡ Performance Considerations

- MongoDB indexes on frequently queried fields
- Efficient settlement calculation algorithm
- Proper error handling and validation
- Connection pooling for database operations

## 🔒 Security Measures

- Input validation and sanitization
- MongoDB connection string security
- Environment variable protection
- CORS configuration

## Known Limitations or Assumptions

- The system currently assumes all expenses are split equally...
- Floating-point precision: While Node.js handles decimals...
- Does not currently support partial payments or tracking historical settlements...


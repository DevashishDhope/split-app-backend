    # Split App Backend

    A backend system that helps groups of people split expenses fairly and calculate who owes money to whom.

    ## Deployed API Base URL
    `https://split-app-backend-production-1bf1.up.railway.app`

    ## Local Development Setup

    1.  **Clone the repository:**
        ```bash
        git clone https://github.com/DevashishDhope/split-app-backend.git
        cd split-app-backend
        ```
    2.  **Install dependencies:**
        ```bash
        npm install
        ```
    3.  **MongoDB Atlas Setup:**
        *   Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
        *   Create a database user (`devashishdhope` with password `733ItPw77LvYy2rp`) and ensure network access is allowed from `0.0.0.0/0`.
        *   Get your connection string (e.g., `mongodb+srv://devashishdhope:733ItPw77LvYy2rp@split-app-cluster.ambodyn.mongodb.net/?retryWrites=true&w=majority`).
    4.  **Create `.env` file:**
        Create a file named `.env` in the project root with the following content:
        ```
        PORT=3000
        MONGODB_URI=mongodb+srv://devashishdhope:733ItPw77LvYy2rp@split-app-cluster.ambodyn.mongodb.net/?retryWrites=true&w=majority
        NODE_ENV=development
        ```
    5.  **Start the server:**
        ```bash
        npm run dev
        ```

    ## API Endpoints (Postman Collection)

    All API endpoints can be tested using the publicly accessible Postman Collection. The collection is pre-configured to use the deployed API base URL and includes sample data and validation tests.

    **Public Postman Collection Gist:**
    https://gist.github.com/DevashishDhope/f9edf19e602a65d12015517fe5ad8736

    ### Expense Management
    *   `POST /api/expenses`: Add new expense (with `amount`, `description`, `paidBy`, `splitType`, `splitDetails`)
    *   `GET /api/expenses`: List all expenses
    *   `PUT /api/expenses/:id`: Update an existing expense by ID
    *   `DELETE /api/expenses/:id`: Delete an expense by ID

    ### Settlement & People Endpoints
    *   `GET /api/people`: List all unique individuals involved in expenses
    *   `GET /api/balances`: Show each person's net balance (owes/owed)
    *   `GET /api/settlements`: Provides an optimized summary of who should pay whom to settle all debts

    ### Data Validation & Error Handling
    The API includes robust input validation and returns clear error messages with appropriate HTTP status codes (e.g., `400 Bad Request` for invalid input, `404 Not Found` for non-existent resources). Examples are included in the Postman collection under "Edge Cases & Validation".

    ## Explanation of Settlement Calculation Logic
    The system calculates individual balances by summing the amounts each person paid and subtracting their respective shares from all expenses. The `getSettlements` endpoint then applies a simplified algorithm: it identifies all debtors (those who owe money) and creditors (those who are owed money). It then processes transactions by matching debtors to creditors, prioritizing larger amounts or minimizing the number of payments, until all balances are settled.

    ## Known Limitations or Assumptions
    *   The system currently assumes all expenses are split equally among *mentioned* individuals if `splitDetails` is not explicitly provided for "equal" type. For `percentage` and `exact` splits, `splitDetails` must be provided in the request body.
    *   Floating-point precision: While Node.js handles decimals, minor rounding differences may occur in very complex or numerous calculations with fractional amounts (common in currency-based systems).
    *   Does not currently support partial payments or tracking historical settlements; it calculates the current state based on all active expenses.

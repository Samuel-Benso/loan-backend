# Loan Backend API

A RESTful Node.js backend API for managing loan records with MongoDB database integration. This project demonstrates modern Express.js architecture with proper separation of concerns using controllers, models, and routes.

## Project Overview

The **Loan Backend** is a lightweight but functional API that allows users to:

- Create and submit loan applications
- Retrieve all loans or search for specific loans
- Update loan information
- Delete loans from the system
- Search loans by applicant name

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT (Web/Mobile/API)                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     │ HTTP Requests
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXPRESS SERVER (app.js)                     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Middleware Stack:                                         │  │
│  │  • Morgan (Request Logging)                              │  │
│  │  • express.json() (Body Parser)                          │  │
│  │  • dotenv (Environment Variables)                        │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────┬──────────────────────────────────────────────┘
                 │
         GET /   │   GET /loans/:id
         POST /  │   PUT /loans/:id
                 │   DELETE /loans/:id
                 │   GET /loans/search?name=...
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                  ROUTES (routes/loanRoutes.js)                   │
│                                                                  │
│  Router Configuration:                                           │
│  • GET  /             → getAllLoans                             │
│  • POST /             → createLoan                              │
│  • GET  /search       → searchLoanByName                        │
│  • GET  /:id          → getLoanById                             │
│  • PUT  /:id          → updateLoan                              │
│  • DELETE /:id        → deleteLoan                              │
└────────────────┬──────────────────────────────────────────────┘
                 │
                 │ Routes requests to appropriate handler
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              CONTROLLERS (controllers/loanController.js)          │
│                                                                  │
│  Business Logic Layer:                                           │
│  • getAllLoans()      - Fetch all loans                         │
│  • getLoanById()      - Fetch single loan                       │
│  • createLoan()       - Create new loan                         │
│  • updateLoan()       - Update existing loan                    │
│  • deleteLoan()       - Remove loan                             │
│  • searchLoanByName() - Search by applicant name                │
│                                                                  │
│  Each function handles:                                          │
│  ✓ Database operations                                           │
│  ✓ Error handling                                               │
│  ✓ HTTP response formatting                                     │
└────────────────┬──────────────────────────────────────────────┘
                 │
                 │ Queries and updates data
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                 MODELS (models/loan.js)                          │
│                                                                  │
│  Mongoose Schema Definition:                                     │
│  • applicantName (String, Required)                             │
│  • loanAmount (Number, Required)                                │
│  • interestRate (Number)                                        │
│  • loanTerm (Number, in months)                                 │
│  • status (String: pending/approved/rejected)                   │
│  • createdAt (Timestamp)                                        │
│  • updatedAt (Timestamp)                                        │
└────────────────┬──────────────────────────────────────────────┘
                 │
                 │ Validates & persists data
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                  MONGODB (Database)                              │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ loans_collection                                         │  │
│  │ ├─ {_id, applicantName, loanAmount, ...}               │  │
│  │ ├─ {_id, applicantName, loanAmount, ...}               │  │
│  │ └─ {_id, applicantName, loanAmount, ...}               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Connected via: MongoDB Atlas or Local MongoDB Instance         │
└─────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
loan-backend/
│
├── app.js                          # Main Express application entry point
├── package.json                    # Project dependencies and scripts
├── .env                            # Environment variables (MongoDB URI, etc.)
├── .gitignore                      # Git ignore file
│
├── routes/
│   └── loanRoutes.js              # Route definitions for loan endpoints
│
├── controllers/
│   └── loanController.js          # Business logic for loan operations
│
└── models/
    └── loan.js                     # Mongoose schema and model definition
```

## Installation & Setup

### Prerequisites

- Node.js (v14+)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Steps

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd loan-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file in the root directory:**

   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/loans_db
   PORT=3000
   ```

4. **Start the server:**

   ```bash
   node app.js
   ```

   The server will run on `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:3000/loans`

| Method     | Endpoint            | Description                    |
| ---------- | ------------------- | ------------------------------ |
| **GET**    | `/`                 | Get all loans                  |
| **POST**   | `/`                 | Create a new loan              |
| **GET**    | `/search?name=John` | Search loans by applicant name |
| **GET**    | `/:id`              | Get a specific loan by ID      |
| **PUT**    | `/:id`              | Update a loan                  |
| **DELETE** | `/:id`              | Delete a loan                  |

### Example Requests

**Create a loan (POST):**

```bash
curl -X POST http://localhost:3000/loans \
  -H "Content-Type: application/json" \
  -d '{
    "applicantName": "John Doe",
    "loanAmount": 50000,
    "interestRate": 5.5,
    "loanTerm": 60,
    "status": "pending"
  }'
```

**Get all loans (GET):**

```bash
curl http://localhost:3000/loans
```

**Search by name (GET):**

```bash
curl http://localhost:3000/loans/search?name=John
```

**Update a loan (PUT):**

```bash
curl -X PUT http://localhost:3000/loans/123abc \
  -H "Content-Type: application/json" \
  -d '{"status": "approved"}'
```

**Delete a loan (DELETE):**

```bash
curl -X DELETE http://localhost:3000/loans/123abc
```

## Technologies Used

- **Express.js** - Web framework for Node.js
- **Mongoose** - MongoDB object modeling
- **MongoDB** - NoSQL database
- **Morgan** - HTTP request logger
- **dotenv** - Environment variable management
- **Node.js** - JavaScript runtime

## Key Features

✅ **RESTful API Design** - Follows REST conventions for CRUD operations  
✅ **Error Handling** - Comprehensive try-catch blocks with meaningful error messages  
✅ **Status Codes** - Proper HTTP status codes (200, 201, 404, 500)  
✅ **Search Functionality** - Query loans by applicant name  
✅ **Database Integration** - MongoDB with Mongoose ODM  
✅ **Middleware Stack** - Request logging and JSON parsing  
✅ **Environment Configuration** - Secure configuration via .env

## Response Format

All responses are in JSON format:

**Success Response:**

```json
{
  "message": "Loan saved to database!",
  "loan": {
    "_id": "507f1f77bcf86cd799439011",
    "applicantName": "John Doe",
    "loanAmount": 50000,
    "interestRate": 5.5,
    "loanTerm": 60,
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response:**

```json
{
  "message": "Loan not found"
}
```

## Development Notes

- Each route is mapped to a controller function that handles the business logic
- Database operations are asynchronous using async/await syntax
- All endpoints validate input and return appropriate HTTP status codes
- The router is modular and can be extended with additional routes

## Future Enhancements

- Add authentication (JWT tokens)
- Implement rate limiting
- Add input validation middleware
- Create comprehensive test suite
- Add pagination for loan listings
- Implement caching with Redis
- Add user roles and permissions

## License

ISC

---

**Created:** 2025 | **Last Updated:** December 2025

// models/Loan.js

const mongoose = require("mongoose"); 

// This is the blueprint (Schema) with validation rules
const loanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required to process the loan."], // 🌟 Rule 1: Must be present
    trim: true, // Optional: Removes whitespace from both ends of a string
    minlength: [3, "Name must be at least 3 characters long."] // Optional: Minimum length
  },
  amount: {
    type: Number,
    required: [true, "Loan amount is required."], // 🌟 Rule 2: Must be present
    min: [100, "Loan amount must be at least 100."], // 🌟 Rule 3: Minimum value
    max: [100000, "Loan amount cannot exceed 100,000."] // Optional: Maximum value
  },
  // Optional: Add a default loan status field, similar to what the class described
  loanStatus: {
    type: Boolean,
    default: false,
  }
});

// This is the actual object (Model) we use to talk to the database
const LoanModel = mongoose.model("Loan", loanSchema);

// Send the Model out so other files (like the controller) can use it
module.exports = LoanModel;
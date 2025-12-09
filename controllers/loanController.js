// controllers/loanController.js

// Bring in the Model (the recipe)
const LoanModel = require("../models/Loan");

// 1. GET ALL loans
exports.getAllLoans = async (req, res) => {
  try {
    const items = await LoanModel.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. GET ONE loan by ID
exports.getLoanById = async (req, res) => {
  try {
    const item = await LoanModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. POST/APPLY for a loan
exports.createLoan = async (req, res) => {
  const data = req.body;
  try {
    const newLoan = new LoanModel(data);
    await newLoan.save();

    res.status(201).json({ // Use 201 for 'Created'
      message: "Loan saved to database!",
      loan: newLoan,
    });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Use 400 for input errors
  }
};

// 4. UPDATE loan by ID
exports.updateLoan = async (req, res) => {
  const updatedData = req.body;
  try {
    const updatedLoan = await LoanModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updatedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.status(200).json({
      message: "Loan updated successfully",
      loan: updatedLoan,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5. DELETE loan by ID
exports.deleteLoan = async (req, res) => {
  try {
    const deletedLoan = await LoanModel.findByIdAndDelete(req.params.id);

    if (!deletedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 6. GET one loan by Name (via query parameter)
exports.searchLoanByName = async (req, res) => {
  try {
    // Get the 'name' from the URL query string (e.g., ?name=John)
    const { name } = req.query; 

    if (!name) {
      return res.status(400).json({ message: "Name query parameter is required for search." });
    }

    // Use findOne() to find the first matching document
    const item = await LoanModel.findOne({ name: name }); 

    if (!item) {
      // If Mongoose returns null, the loan was not found
      return res.status(404).json({ message: "Loan not found with that name." });
    }

    res.status(200).json(item);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
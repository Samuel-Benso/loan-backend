// routes/loanRoutes.js

const express = require("express");
const router = express.Router(); // A mini-Express app just for handling routes!

// Bring in the Controller (the cook's functions)
const loanController = require("../controllers/loanController");

// The /loans path is the start. We only define the rest of the path here.

// GET ALL loans and POST a new loan (The path is just '/')
router.route("/").get(loanController.getAllLoans).post(loanController.createLoan);

// Get ALL loans and POST a new loan (The path is just '/')
router.route("/")
  .get(loanController.getAllLoans)
  .post(loanController.createLoan);

// Route for searching by name (using /loans/search?name=...)
router.route("/search")
  .get(loanController.searchLoanByName);

// GET one, UPDATE one, and DELETE one (The path includes the ID)
router
  .route("/:id")
  .get(loanController.getLoanById)
  .put(loanController.updateLoan)
  .delete(loanController.deleteLoan);
  
// Send the router out to be used in app.js
module.exports = router;
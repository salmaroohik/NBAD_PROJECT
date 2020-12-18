const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema({
  expense: { type: Number, required: true },
 
  expenseName: {type: String, required: true},
  userId: { type: String, required: true },
});

module.exports = Expense = mongoose.model("expense", expensesSchema);
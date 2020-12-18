const mongoose = require("mongoose");

const budgetsSchema = new mongoose.Schema({
  budget: { type: Number, required: true },
 
  budgetName: {type: String, required: true},
  userId: { type: String, required: true },
});

module.exports = Budget = mongoose.model("budget", budgetsSchema);
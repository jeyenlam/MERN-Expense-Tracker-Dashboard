const ExpenseSchema = require('../models/ExpenseModel');

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = new ExpenseSchema({
    title,
    amount,
    category,
    description,
    date
  });

  try {
    if (!title || !category || !amount || !description || !date) {
      return res.status(400).json({ message: "All fields must be filled out!" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Amount must be a positive number!" });
    }

    await expense.save();
    res.status(200).json({ message: "Expense added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({created: -1})
    res.status(200).json(expenses)

  } catch (error){
    res.status(500).json({message: "Internal Server Errpr"})
  }
}

exports.deleteExpense = async (req, res) => {

  const {id} = req.params;

  ExpenseSchema.findByIdAndDelete(id)
    .then(expense => {
      res.status(200).json({message: "Expense deleted"})
    })
    .catch ((error) => {
      res.status(500).json({message: 'Server Error'})
    })
}
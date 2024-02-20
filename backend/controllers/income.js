const IncomeSchema = require('../models/IncomeModel');

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = new IncomeSchema({
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

    await income.save();
    res.status(200).json({ message: "Income added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await  IncomeSchema.find().sort({created: -1})
    res.status(200).json(incomes)

  } catch (error){
    res.status(500).json({message: "Internal Server Errpr"})
  }
}

exports.deleteIncome = async (req, res) => {

  const {id} = req.params;

  IncomeSchema.findByIdAndDelete(id)
    .then(income => {
      res.status(200).json({message: "Income deleted"})
    })
    .catch ((error) => {
      res.status(500).json({message: 'Server Error'})
    })
}
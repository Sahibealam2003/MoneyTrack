const Income = require("../models/incomeSchema");
const User = require("../models/userSchema");

exports.addIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!source || !amount || !date) throw new Error("All fields are require");
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date.now(),
    });
    await newIncome.save()
    res.exports
  } catch (error) {}
};

exports.getAllIncome = async (req, res) => {};
exports.downlodeIncomeExcel = async (req, res) => {};
exports.deleteIncome = async (req, res) => {};

const express = require('express')
const route = express.Router()
const {addExpense,getAllExpense,deleteExpense,downlodeExpenseExcel} = require('../controllers/expenseController')
const { protect } = require('../middleware/authMiddleware')



route.post('/add',protect,addExpense)
route.get('/get',protect,getAllExpense)
route.post('/downlodeexcel',protect,downlodeExpenseExcel)
route.delete('/:id',protect,deleteExpense);
module.exports = {
    route
}
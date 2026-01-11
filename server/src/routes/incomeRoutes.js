const express = require('express')
const route = express.Router()
const {addIncome,getAllIncome,deleteIncome,downlodeIncomeExcel} = require('../controllers/incomeController')
const { protect } = require('../middleware/authMiddleware')



route.post('/add',protect,addIncome)
route.get('/get',protect,getAllIncome)
route.post('/downlodeexcel',protect,downlodeIncomeExcel)
route.delete('/:id',protect,deleteIncome);
module.exports = {
    route
}
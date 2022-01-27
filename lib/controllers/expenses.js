const { Router } = require('express');
const Expense = require('../models/Expense');


module.exports = Router().post('/', async (req, res, next) => {
  try{
    const newExpense = await Expense.insert({
      rent: req.body.rent,
      phone: req.body.phone,
      transportation: req.body.transportation,
      food: req.body.food,
      utilities: req.body.utilities,
      entertainment: req.body.entertainment,
      savings: req.body.savings,
    });
    res.send(newExpense);
  }catch(error){
    next(error);
  }
});

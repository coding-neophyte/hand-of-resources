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
})
  .get('/', async (req, res, next) => {
    try{
      const allExpenses = await Expense.getAllExpenses();

      res.send(allExpenses);
    }catch(error){
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      const singleExpense = await Expense.getExpenseById(id);

      res.send(singleExpense);
    }catch(error){
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      const existingExpense = await Expense.getExpenseById(id);

      if(!existingExpense) return res.status(404).json({
        message: 'expense not found',
      });

      const editedExpense = await Expense.updateExpense(existingExpense.id, {
        rent: req.body.rent,
        phone: req.body.phone,
        transportation: req.body.transportation,
        food: req.body.food,
        utilities: req.body.utilities,
        entertainment: req.body.entertainment,
        savings: req.body.savings,
      });
      res.send(editedExpense);
    }catch(error){
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;

      const deletedExpense = await Expense.deleteExpense(id);

      res.send(deletedExpense);
    }catch(error){
      next(error);
    }
  });

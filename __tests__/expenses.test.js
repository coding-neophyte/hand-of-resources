const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const setup = require('../data/setup');
const Expense = require('../lib/models/Expense');

describe('testing expense routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create new expense', async () => {
    const res = await request(app).post('/api/v1/expenses').send({
      rent: 2000.00,
      phone: 120.00,
      transportation: 100.00,
      food: 300.00,
      utilities: 150.00,
      entertainment: 300.00,
      savings: 1000.00,
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      rent: 2000.00,
      phone: 120.00,
      transportation: 100.00,
      food: 300.00,
      utilities: 150.00,
      entertainment: 300.00,
      savings: 1000.00,
    });
  });

  it('should return a list of expenses', async () => {
    const newExpense = await Expense.insert({
      rent: 2000.00,
      phone: 120.00,
      transportation: 100.00,
      food: 300.00,
      utilities: 150.00,
      entertainment: 300.00,
      savings: 1000.00,
    });
    const res = await request(app).get('/api/v1/expenses');

    expect(res.body).toEqual([newExpense]);
  });

  it('should return an expense by id', async () => {
    const expense = await Expense.insert({
      rent: 2000.00,
      phone: 120.00,
      transportation: 100.00,
      food: 300.00,
      utilities: 150.00,
      entertainment: 300.00,
      savings: 1000.00,
    });

    const res = await request(app).get(`/api/v1/expenses/${expense.id}`);

    expect(res.body).toEqual(expense);
  });

  it('should update an existing expense', async () => {
    const expense = await Expense.insert({
      rent: 2000.00,
      phone: 120.00,
      transportation: 100.00,
      food: 300.00,
      utilities: 150.00,
      entertainment: 300.00,
      savings: 1000.00,
    });
    const res = await request(app).patch(`/api/v1/expenses/${expense.id}`).send({
      rent: 1000.00,
      phone: 100.00,
      transportation: 120.00,
      food: 300.00,
      utilities: 150.00,
      entertainment: 300.00,
      savings: 1000.00,
    });

    const updatedExpense = {
      id: expect.any(String),
      rent: 1000.00,
      phone: 100.00,
      transportation: 120.00,
      food: 300.00,
      utilities: 150.00,
      entertainment: 300.00,
      savings: 1000.00,
    };
    expect(res.body).toEqual(updatedExpense);
    expect(await Expense.getExpenseById(expense.id)).toEqual(updatedExpense);
  });
});

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
});

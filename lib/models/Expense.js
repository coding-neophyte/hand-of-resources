const pool = require('../utils/pool');


module.exports = class Expense {
  id;
  rent;
  phone;
  transportation;
  food;
  utilities;
  entertainment;
  savings;


  constructor(row){
    this.id = row.id;
    this.rent = row.rent;
    this.phone = row.phone;
    this.transportation = row.transportation;
    this.food = row.food;
    this.utilities = row.utilities;
    this.entertainment = row.entertainment;
    this.savings = row.savings;
  }

  static async insert({ rent, phone, transportation, food, utilities, entertainment, savings }){
    const { rows } = await pool.query(`INSERT INTO monthly_expenses (rent, phone, transportation, food, utilities, entertainment, savings)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`, [rent, phone, transportation, food, utilities, entertainment, savings]);

    return new Expense(rows[0]);
  }

  static async getAllExpenses(){
    const { rows } = await pool.query('SELECT * FROM monthly_expenses');

    return rows.map((row) => new Expense(row));
  }

  static async getExpenseById(id){
    const { rows } = await pool.query(`SELECT * FROM monthly_expenses
      WHERE id=$1`, [id]);


    if(!rows[0]) return null;

    return new Expense(rows[0]);
  }

  static async updateExpense(id, { rent, phone, transportation, food, utilities, entertainment, savings }){
    const { rows } = await pool.query(`UPDATE monthly_expenses
      SET rent=$2, phone=$3, transportation=$4, food=$5, utilities=$6, entertainment=$7, savings=$8
      WHERE id=$1
      RETURNING *`, [id, rent, phone, transportation, food, utilities, entertainment, savings]);

    return new Expense(rows[0]);
  }

  static async deleteExpense(id){
    const { rows } = await pool.query(`DELETE FROM monthly_expenses
      WHERE id=$1
      RETURNING *`, [id]);

    return new Expense(rows[0]);
  }
};

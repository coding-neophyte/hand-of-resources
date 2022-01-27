const pool = require('../utils/pool');

module.exports = class Workout {
  id;
  workout_name;
  muscles_worked;

  constructor(row){
    this.id = row.id;
    this.workout_name = row.workout_name;
    this.muscles_worked = row.muscles_worked;
  }

  static async insert({ workout_name, muscles_worked }){
    const { rows } = await pool.query(`INSERT INTO workouts (workout_name, muscles_worked)
        VALUES ($1, $2)
        RETURNING *`, [workout_name, muscles_worked]);

    return new Workout(rows[0]);
  }

  static async getAllWorkouts(){
    const { rows } = await pool.query('SELECT * FROM workouts');

    return rows.map((row) => new Workout(row));
  }

  static async getWorkoutByid(id){
    const { rows } = await pool.query(`SELECT * FROM workouts
      WHERE id=$1`, [id]);

    if(!rows[0]) return null;

    return new Workout(rows[0]);
  }

  static async updateWorkout(id, { workout_name, muscles_worked }){
    const { rows } = await pool.query(`UPDATE workouts
      SET workout_name=$2, muscles_worked=$3
      WHERE id=$1
      RETURNING *`, [id, workout_name, muscles_worked]);

    return new Workout(rows[0]);
  }

  static async deleteWorkout(id){
    const { rows } = await pool.query(`DELETE FROM workouts
      WHERE id=$1
      RETURNING *`, [id]);

    if(!rows[0]) return null;

    return new Workout(rows[0]);
  }
};

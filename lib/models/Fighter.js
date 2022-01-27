const pool = require('../utils/pool');

module.exports = class Fighter {
  id;
  name;
  style;
  wins;
  losses;
  hometown;

  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.style = row.style;
    this.wins = row.wins;
    this.losses = row.losses;
    this.hometown = row.hometown;
  }

  static async insert({ name, style, wins, losses, hometown }){
    const { rows } = await pool.query(`INSERT INTO favorite_fighters (name, style, wins, losses, hometown)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`, [name, style, wins, losses, hometown]);

    return new Fighter(rows[0]);
  }

  static async getAllFighters(){
    const { rows } = await pool.query('SELECT * FROM favorite_fighters');

    return rows.map((row) => new Fighter(row));
  }

  static async getFighterById(id){
    const { rows } = await pool.query(`SELECT * FROM favorite_fighters
        WHERE id=$1`, [id]);

    if(!rows[0]) return null;

    return new Fighter(rows[0]);
  }

  static async updateFighter(id, { name, style, wins, losses, hometown }){
    const { rows } = await pool.query(`UPDATE favorite_fighters
      SET name=$2, style=$3, wins=$4, losses=$5, hometown=$6
      WHERE id=$1
      RETURNING *`, [id, name, style, wins, losses, hometown]);

    return new Fighter(rows[0]);
  }

  static async deleteFighter(id){
    const { rows } = await pool.query(`DELETE FROM favorite_fighters
        WHERE id=$1
        RETURNING *`, [id]);

    return new Fighter(rows[0]);
  }
};

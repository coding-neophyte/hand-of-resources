const pool = require('../utils/pool');

module.exports = class Team {
  id;
  team_name;
  city;
  conference;
  championships;

  constructor(row){
    this.id = row.id;
    this.team_name = row.team_name;
    this.city = row.city;
    this.conference = row.conference;
    this.championships = row.championships;

  }
  static async insert({ team_name, city, conference, championships }){
    const { rows } = await pool.query(`INSERT INTO favorite_teams (team_name, city, conference, championships)
      VALUES ($1, $2, $3, $4)
      RETURNING *`, [team_name, city, conference, championships]);

    return new Team(rows[0]);
  }

  static async getAllTeams(){
    const { rows } = await pool.query('SELECT * FROM favorite_teams');

    return rows.map((row) => new Team(row));
  }

  static async getSingleTeam(id){
    const { rows } = await pool.query(`SELECT * FROM favorite_teams
      WHERE id=$1`, [id]);

    return new Team(rows[0]);
  }

  static async updateTeam(id, { team_name, city, conference, championships }){
    const { rows } = await pool.query(`UPDATE favorite_teams
      SET team_name=$2, city=$3, conference=$4, championships=$5
      WHERE id=$1
      RETURNING *`, [id, team_name, city, conference, championships]);

    return new Team(rows[0]);
  }

  static async deleteTeam(id){
    const { rows } = await pool.query(`DELETE FROM favorite_teams
      WHERE id=$1
      RETURNING *`, [id]);

    return new Team(rows[0]);
  }

};

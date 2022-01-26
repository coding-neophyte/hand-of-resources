const pool = require('../utils/pool')

module.exports = class Music {
    id;
    song_title;
    artist;
    album;
    genre

    constructor(row){
        this.id = row.id;
        this.song_title = row.song_title;
        this.artist = row.artist;
        this.album = row.album;
        this.genre = row.genre;
    }

    static async insert({ song_title, artist, album, genre}){
        const { rows } = await pool.query(`INSERT INTO music
        (song_title, artist, album, genre)
        VALUES ($1, $2, $3, $4)
        RETURNING *`, [song_title, artist, album, genre]);

        return new Music(rows[0]);
    };

    static async allSongs(){
        const { rows } = await pool.query(`SELECT * FROM music`);

        return rows.map((row) => new Music(row));
    };

    static async songById(id){
        const { rows } = await pool.query(`SELECT * FROM music
        WHERE id=$1`, [id]);

        if(!rows[0]) return null;

        return new Music(rows[0]);
    }

    static async updateSong(id, { song_title, artist, album, genre }){
        const { rows } = await pool.query(`UPDATE music
        SET song_title=$2, artist=$3, album=$4, genre=$5
        WHERE id=$1
        RETURNING *`, [id, song_title, artist, album, genre]);

        return new Music(rows[0]);
    }

    static async deleteSong(id){
        const { rows } = await pool.query(`DELETE FROM music
        WHERE id=$1
        RETURNING *`, [id]);

        return new Music(rows[0]);
    }

}

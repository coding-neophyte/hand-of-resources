const { Router } = require('express');
const Music = require('../models/Music');

module.exports = Router().post('/', async (req, res, next) => {
    try{
        const newSong = await Music.insert({
            song_title: req.body.song_title,
            artist: req.body.artist,
            album: req.body.album,
            genre: req.body.genre,
        });
        res.send(newSong);

    }catch(error){
        next(error);
    }
})
.get('/', async (req, res, next ) => {
    try{
        const songList = await Music.allSongs();

        res.send(songList);
    }catch(error){
        next(error);
    };
})

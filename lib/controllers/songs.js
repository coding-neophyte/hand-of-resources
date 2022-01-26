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
.get('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
    const singleSong = await Music.songById(id)
    res.send(singleSong);
    }catch(error){
        next(error);
    }
})
.patch('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const existingSong = await Music.songById(id)

        if(!existingSong) return res.status(404).json({
            message: ' no song found'
        });

    const editedSong = await Music.updateSong(existingSong.id, {
        song_title: req.body.song_title,
        artist: req.body.artist,
        album: req.body.album,
        genre: req.body.genre,
    });
        res.send(editedSong);
    }catch(error){
        next(error);
    }
})
.delete('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const deletedSong = await Music.deleteSong(id)
        res.send(deletedSong);
    }catch(error){
        next(error);
    }
})

const pool = require('../lib/utils/pool')
const setup = require('../data/setup')
const request = require('supertest')
const app = require('../lib/app')
const Music = require('../lib/models/Music')



describe('testing music routes', () => {
    beforeEach(() => {
        return setup(pool);
    })

    afterAll(() => {
        pool.end();
    })

    it('should add new song', async () => {
        const res = await request(app).post('/api/v1/music').send({
            song_title: 'warm',
            artist: 'sg lewis',
            album: 'chemicals',
            genre: 'pop',
        });

        expect(res.body).toEqual({
            id: expect.any(String),
            song_title: 'warm',
            artist: 'sg lewis',
            album: 'chemicals',
            genre: 'pop',
        })
    })

    it('should get list of songs', async () => {
        const newSong = await Music.insert({
            song_title: 'warm',
            artist: 'sg lewis',
            album: 'chemicals',
            genre: 'pop',
        });
        const res = await request(app).get('/api/v1/music')

        expect(res.body).toEqual([newSong]);
    })

    it('should retrieve single song', async () => {
        const singleSong = await Music.insert({
            song_title: 'two ways',
            artist: 'trey songz',
            album: 'back home',
            genre: 'rnb',
        })
        const res = await request(app).get(`/api/v1/music/${singleSong.id}`)

        expect(res.body).toEqual({...singleSong, id: expect.any(String)})
    })

    it('should edit an existing song', async () => {
        const newSong = await Music.insert({
            song_title: 'digital kids',
            artist: 'taiwo',
            album: 'unknown',
            genre: 'rnb',
        });
        const res = await request(app).patch(`/api/v1/music/${newSong.id}`).send({
            song_title: 'digital kids',
            artist: 'viktor taiwo and solomon',
            album: 'unknown',
            genre: 'rnb',
        })

        const updatedSong = {
            id: expect.any(String),
            song_title: 'digital kids',
            artist: 'viktor taiwo and solomon',
            album: 'unknown',
            genre: 'rnb',
        };
        expect(res.body).toEqual(updatedSong)
        expect(await Music.songById(newSong.id)).toEqual(updatedSong)
    })

    it('should delete a song', async () => {
        const newSong = await Music.insert({
            song_title: 'digital kids',
            artist: 'viktor taiwo and solomon',
            album: 'unknown',
            genre: 'rnb',
        })
        const res = await request(app).delete(`/api/v1/music/${newSong.id}`);

        expect(res.body).toEqual(newSong);
        expect(await Music.songById(newSong.id)).toBeNull();
    })

})

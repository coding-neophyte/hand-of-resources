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
})

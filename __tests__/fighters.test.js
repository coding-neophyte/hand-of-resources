const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Fighter = require('../lib/models/Fighter');

describe('testing fighter routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create new fighter', async () => {
    const res = await request(app).post('/api/v1/fighters').send({
      name: 'floyd mayweather',
      style: 'boxing',
      wins: 50,
      losses: 0,
      hometown: 'grand rapids, mi'
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'floyd mayweather',
      style: 'boxing',
      wins: 50,
      losses: 0,
      hometown: 'grand rapids, mi'
    });
  });

  it('should get list of fighters', async () => {
    const newFighter = await Fighter.insert({
      name: 'floyd mayweather',
      style: 'boxing',
      wins: 50,
      losses: 0,
      hometown: 'grand rapids, mi'
    });

    const res = await request(app).get('/api/v1/fighters');

    expect(res.body).toEqual([newFighter]);
  });

  it('should get fighter by id', async () => {
    const newFighter = await Fighter.insert({
      name: 'conor mcgregor',
      style: 'mma',
      wins: 22,
      losses: 6,
      hometown: 'ireland'
    });

    const res = await request(app).get(`/api/v1/fighters/${newFighter.id}`);

    expect(res.body).toEqual(newFighter);
  });
});

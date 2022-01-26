const request = require('supertest');
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const app = require('../lib/app');
const Team = require('../lib/models/Team');


describe('testing team routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it.only('should add new team', async () => {
    const res = await request(app).post('/api/v1/teams').send({
      team_name: 'Knicks',
      city: 'New York',
      conference: 'eastern conference',
      championships: 2,
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      team_name: 'Knicks',
      city: 'New York',
      conference: 'eastern conference',
      championships: 2,
    });
  });

});

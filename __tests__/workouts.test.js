const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const setup = require('../data/setup');
const Workout = require('../lib/models/Workout');

describe('testing workout routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('should create new workout', async () => {
    const res = await request(app).post('/api/v1/workouts').send({
      workout_name: 'shoulder press',
      muscles_worked: 'shoulders',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      workout_name: 'shoulder press',
      muscles_worked: 'shoulders',
    });
  });

  it('should get workout list', async () => {
    const workout = await Workout.insert({
      workout_name: 'shoulder press',
      muscles_worked: 'shoulders',
    });

    const res = await request(app).get('/api/v1/workouts');

    expect(res.body).toEqual([workout]);
  });

});

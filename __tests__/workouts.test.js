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

  it('should get workout by id ', async () => {
    const newWorkout = await Workout.insert({
      workout_name: 'leg press',
      muscles_worked: 'legs',
    });

    const res = await request(app).get(`/api/v1/workouts/${newWorkout.id}`);

    expect(res.body).toEqual({
      id: expect.any(String),
      workout_name: 'leg press',
      muscles_worked: 'legs',
    });
  });

  it('should update existing workout', async () => {
    const newWorkout = await Workout.insert({
      workout_name: 'bench press',
      muscles_worked: 'chest',
    });

    const res = await request(app).patch(`/api/v1/workouts/${newWorkout.id}`).send({
      workout_name: 'bench press',
      muscles_worked: 'chest/shoulders',
    });

    const editedWorkout = {
      id: expect.any(String),
      workout_name: 'bench press',
      muscles_worked: 'chest/shoulders',
    };

    expect(res.body).toEqual(editedWorkout);
    expect(await Workout.getWorkoutByid(newWorkout.id)).toEqual(editedWorkout);
  });

  it('should delete workout', async () => {
    const newWorkout = await Workout.insert({
      workout_name: 'squats',
      muscles_worked: 'legs',
    });
    const res = await request(app).delete(`/api/v1/workouts/${newWorkout.id}`);

    expect(res.body).toEqual(newWorkout);
    expect(await Workout.getWorkoutByid(newWorkout.id)).toBeNull();
  });

});

const { Router } = require('express');
const Workout = require('../models/Workout');


module.exports = Router().post('/', async (req, res, next) => {
  try{
    const newWorkout = await Workout.insert({
      workout_name: req.body.workout_name,
      muscles_worked: req.body.muscles_worked,
    });
    res.send(newWorkout);
  }catch(error){
    next(error);
  }
})
  .get('/', async (req, res, next) => {
    try{
      const workoutList = await Workout.getAllWorkouts();

      res.send(workoutList);
    }catch(error){
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      const singleWorkout = await Workout.getWorkoutByid(id);

      res.send(singleWorkout);
    }catch(error){
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      const existingWorkout = await Workout.getWorkoutByid(id);

      if(!existingWorkout) return res.status(404).json({
        message: 'no workout found',
      });

      const editedWorkout = await Workout.updateWorkout(existingWorkout.id, {
        workout_name: req.body.workout_name,
        muscles_worked: req.body.muscles_worked,
      });

      res.send(editedWorkout);
    }catch(error){
      next(error);
    }
  });

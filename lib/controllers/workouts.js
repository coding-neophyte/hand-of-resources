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
});

const { Router } = require('express');
const Fighter = require('../models/Fighter');


module.exports = Router().post('/', async (req, res, next) => {
  try{
    const newFighter = await Fighter.insert({
      name: req.body.name,
      style: req.body.style,
      wins: req.body.wins,
      losses: req.body.losses,
      hometown: req.body.hometown,
    });
    res.send(newFighter);
  }catch(error){
    next(error);
  }
})
  .get('/', async (req, res, next) => {
    try{
      const fighterList = await Fighter.getAllFighters();

      res.send(fighterList);
    }catch(error){
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      const singleFighter = await Fighter.getFighterById(id);

      res.send(singleFighter);
    }catch(error){
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      const existingFighter = await Fighter.getFighterById(id);

      if(!existingFighter) return res.status(404).json({
        message: 'fighter not found',
      });

      const editedFighter = await Fighter.updateFighter(existingFighter.id, {
        name: req.body.name,
        style: req.body.style,
        wins: req.body.wins,
        losses: req.body.losses,
        hometown: req.body.hometown,
      });
      res.send(editedFighter);
    }catch(error){
      next(error);
    }
  });

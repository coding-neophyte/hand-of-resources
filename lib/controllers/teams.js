const { Router } = require('express');
const Team = require('../models/Team');

module.exports = Router().post('/', async (req, res, next) => {
  try{
    const newTeam = await Team.insert({
      team_name: req.body.team_name,
      city: req.body.city,
      conference: req.body.conference,
      championships: req.body.championships,
    });
    res.send(newTeam);
  }catch(error){
    next(error);
  }
})
  .get('/', async (req, res, next) => {
    try{
      const teamList = await Team.getAllTeams();
      res.send(teamList);
    }catch(error){
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try{
      const { id } = req.params;
      const singleTeam = await Team.getSingleTeam(id);

      res.send(singleTeam);
    }catch(error){
      next(error);
    }
  });

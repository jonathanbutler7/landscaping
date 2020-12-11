const express = require('express');
const TechniciansService = require('./technicians-service');

const techniciansRouter = express.Router();
const jsonParser = express.json();

techniciansRouter.route('/').get((req, res, next) => {
  TechniciansService.getAllTechnicians(req.app.get('db'))
    .then((jobs) => {
      res.json(jobs);
    })
    .catch(next);
});
techniciansRouter.put('/:id', jsonParser, (req, res, next) => {
  const db = req.app.get('db');
  const { id } = req.params;
  const { body } = req;
  db('technicians')
    .where({ _id: id })
    .update(body)
    .returning('*')
    .then((data) => {
      res.send(data);
    })
    .catch(next);
});

module.exports = techniciansRouter;

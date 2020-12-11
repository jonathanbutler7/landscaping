const express = require('express');
const JobsService = require('./jobs-service');

const jobsRouter = express.Router();
const jsonParser = express.json();

jobsRouter.route('/').get((req, res, next) => {
  JobsService.getAllJobs(req.app.get('db'))
    .then((jobs) => {
      res.json(jobs);
    })
    .catch(next);
});
jobsRouter.put('/:id', jsonParser, (req, res, next) => {
  const db = req.app.get('db');
  const { id } = req.params;
  const { body } = req;
  db('jobs')
    .where({ _id: id })
    .update(body)
    .returning('*')
    .then((data) => {
      res.send(data);
    })
    .catch(next);
});

module.exports = jobsRouter;

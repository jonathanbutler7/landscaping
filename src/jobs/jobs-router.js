const express = require('express');
const JobsService = require('./jobs-service');

const jobsRouter = express.Router();

jobsRouter.route('/').get((req, res, next) => {
  JobsService.getAllJobs(req.app.get('db'))
    .then((jobs) => {
      res.json(jobs);
    })
    .catch(next);
});

module.exports = jobsRouter;

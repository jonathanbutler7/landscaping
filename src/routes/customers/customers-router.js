const express = require('express');
const CustomersService = require('./customers-service');

const customersRouter = express.Router();
const jsonParser = express.json();

customersRouter.route('/').get((req, res, next) => {
  CustomersService.getAllCustomers(req.app.get('db'))
    .then((jobs) => {
      res.json(jobs);
    })
    .catch(next);
});
customersRouter.put('/:id', jsonParser, (req, res, next) => {
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

module.exports = customersRouter;

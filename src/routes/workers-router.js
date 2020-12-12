const express = require('express');
const RouteService = require('./route-service');

const endpoint = 'workers';
const workersRouter = express.Router();
const jsonParser = express.json();

workersRouter
  .route('/')
  .get(async (req, res) => {
    const db = req.app.get('db');
    try {
      const result = await RouteService.getAll(db, endpoint);
      res.status(200).send(result);
    } catch (error) {
      res.status(404).send(error);
    }
  })
  .post(jsonParser, async (req, res) => {
    const { name, email, phone, address, data } = req.body;
    const newWorker = {
      name,
      email,
      phone,
      address,
      data,
    };
    const db = req.app.get('db');
    try {
      const result = await RouteService.insert(db, newWorker, endpoint);
      res.status(201).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  });

workersRouter
  .route('/:id')
  .all(async (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;
    try {
      const result = await RouteService.getById(db, id, endpoint);
      foundWorker = result;
      next();
    } catch (error) {
      res.status(404).send({ error: `Worker with id ${id} does not exist.` });
    }
  })
  .get(async (req, res) => {
    res.status(201).send(foundWorker);
  })
  .put(jsonParser, async (req, res) => {
    // {
    //   "name": "Joe",
    //     "email": "tech@tech.com",
    //     "phone": "123-123-1234",
    //     "address": "123 Orchard Avenue",
    //     "data": ["yard work", "landscaping"]
    //     }
    const db = req.app.get('db');
    const { id } = req.params;
    const { name, email, phone, address, data } = req.body;
    const newWorker = { name, email, phone, address, data };
    const numOfVals = Object.values(newWorker).filter(Boolean).length;
    if (numOfVals === 0) {
      res.status(400).json({
        error: {
          message: 'Error(s) in request body',
        },
      });
    }
    try {
      const result = await RouteService.update(db, id, newWorker, endpoint);
      res.send(result);
    } catch (error) {
      res.status(404).send({ message: `Worker with ${id} does not exist` });
    }
  })
  .delete(async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    try {
      const result = await RouteService.delete(db, id, endpoint);
      const workerId = result[0]._id;
      res.status(204).send({ message: `Deleted worker with id: ${workerId}` });
    } catch (error) {
      res.status(404).send({ message: `Worker with ${id} does not exist` });
    }
  });

module.exports = workersRouter;

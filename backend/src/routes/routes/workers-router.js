const express = require('express');
const RouteService = require('../route-service');
const { numberOfValues, missingPostParams } = require('../helpers');
const table = 'workers';
const workersRouter = express.Router();

workersRouter
  .route('/')
  .get(async (req, res) => {
    const db = req.app.get('db');
    try {
      const result = await RouteService.getAll(db, table);
      res.status(200).send(result);
    } catch (error) {
      res.status(404).send(error);
    }
  })
  .post(async (req, res) => {
    const db = req.app.get('db');
    const { name, email, phone, address, services } = req.body;
    console.log(req.body)
    const newWorker = {
      name,
      email,
      phone,
      address,
      services,
    };
    const missingParams = missingPostParams(newWorker);
    try {
      if (missingParams.length > 0) {
        throw { message: `Body has missing fields: ${missingParams}.` };
      }
      const result = await RouteService.insert(db, newWorker, table);
      res.status(201).send(result[0]);
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
      const result = await RouteService.getById(db, id, table);
      foundWorker = result;
      if (!foundWorker.length) {
        throw `Worker with id ${id} does not exist.`;
      }
      next();
    } catch (error) {
      res.status(404).send({ error: `Worker with id ${id} does not exist.` });
    }
  })
  .get(async (req, res) => {
    res.status(200).send(foundWorker);
  })
  .put(async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const { name, email, phone, address, services } = req.body;
    const newWorker = { name, email, phone, address, services };
    const checkBody = numberOfValues(newWorker);
    try {
      if (checkBody === 0) {
        throw { message: 'Must submit at least one field.' };
      }
      const result = await RouteService.update(db, id, newWorker, table);
      res.status(200).send(result);
    } catch (error) {
      res.status(404).send(error);
    }
  })
  .delete(async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    try {
      const result = await RouteService.delete(db, id, table);
      const workerId = result[0]._id;
      res.status(200).send({ message: `Deleted worker with id: ${workerId}` });
    } catch (error) {
      res.status(404).send({ message: `Worker with ${id} does not exist` });
    }
  });

module.exports = workersRouter;

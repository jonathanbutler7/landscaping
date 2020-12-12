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
  .get(async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    try {
      const result = await RouteService.getById(db, id, endpoint);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  })
  .put(jsonParser, async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    const { body } = req;
    try {
      const result = await RouteService.update(db, id, body, endpoint);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  })
  .delete(async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    try {
      const result = await RouteService.delete(db, id, endpoint);
      const techId = result[0]._id;
      res.status(204).send({ message: `Deleted worker with id: ${techId}` });
    } catch (error) {
      res.send(error);
    }
  });

module.exports = workersRouter;

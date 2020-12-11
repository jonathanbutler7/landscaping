const express = require('express');
const RouteService = require('./route-service');

const endpoint = 'customers';
const customersRouter = express.Router();
const jsonParser = express.json();

customersRouter
  .route('/')
  .get(async (req, res) => {
    const db = req.app.get('db');
    try {
      const result = await RouteService.getAll(db, endpoint);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  })
  .post(jsonParser, async (req, res) => {
    const {
      name, email, phone, address,
    } = req.body;
    const newTechnician = {
      name,
      email,
      phone,
      address,
    };
    const db = req.app.get('db');
    try {
      const result = await RouteService.insert(db, newTechnician, endpoint);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  });

customersRouter
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
      const jobId = result[0]._id;
      res.send({ message: `Deleted job with id: ${jobId}` });
    } catch (error) {
      res.send(error);
    }
  });

module.exports = customersRouter;

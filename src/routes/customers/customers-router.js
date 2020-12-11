const express = require('express');
const Service = require('../../requests-service');

const endpoint = 'customers';
const customersRouter = express.Router();
const jsonParser = express.json();

customersRouter
  .route('/')
  .get(async (req, res) => {
    const db = req.app.get('db');
    try {
      const result = await Service.getAll(db, endpoint);
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
      const result = await Service.insert(db, newTechnician, endpoint);
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
      const result = await Service.getById(db, id, endpoint);
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
      const result = await Service.update(db, id, body, endpoint);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  })
  .delete(async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    try {
      const result = await Service.delete(db, id, endpoint);
      const jobId = result[0]._id;
      res.send({ message: `Deleted job with id: ${jobId}` });
    } catch (error) {
      res.send(error);
    }
  });

module.exports = customersRouter;

const express = require('express');
const Service = require('./technicians-service');

const endpoint = 'technicians';
const techniciansRouter = express.Router();
const jsonParser = express.json();

techniciansRouter
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
    const { name, email, phone, address } = req.body;
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

techniciansRouter
  .route('/:id')
  .put(jsonParser, async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    const { body } = req;
    try {
      const result = await Service.updateTech(db, id, body, endpoint);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  })
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
  .delete(async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    try {
      const result = await Service.deleteTech(db, id, endpoint);
      const techId = result[0]._id;
      res.send({ message: `Deleted technician with id: ${techId}` });
    } catch (error) {
      res.send(error);
    }
  });

module.exports = techniciansRouter;

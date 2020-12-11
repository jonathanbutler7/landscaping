const express = require('express');
const Service = require('./technicians-service');

const techniciansRouter = express.Router();
const jsonParser = express.json();

techniciansRouter.route('/').get(async (req, res, next) => {
  try {
    const result = await Service.getAllTechnicians(req.app.get('db'));
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

techniciansRouter
  .route('/:id')
  .put(jsonParser, async (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get('db');
    const { body } = req;
    try {
      const result = await Service.updateTech(db, id, body);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  })
  .get(async (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get('db');
    try {
      const result = await Service.getById(db, id);
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  })
  .delete(async (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;
    try {
      const result = await Service.deleteTech(db, id);
      const techId = result[0]._id;
      res.send({ message: `Deleted technician with id: ${techId}` });
    } catch (error) {
      res.send(error);
    }
  });

module.exports = techniciansRouter;

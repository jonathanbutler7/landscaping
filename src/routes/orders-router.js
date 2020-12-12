const express = require('express');
const RouteService = require('./route-service');

const endpoint = 'orders';
const ordersRouter = express.Router();
const jsonParser = express.json();

ordersRouter
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
    const db = req.app.get('db');
    const { type, date_requested, zip } = req.body;
    const newOrder = {
      type,
      date_requested,
      zip,
    };
    const pairs = Object.entries(newOrder);
    const missingParams = [];
    pairs.forEach((key) => {
      if (key[1] == null) {
        missingParams.push(key[0]);
      }
    });
    try {
      const result = await RouteService.insert(db, newOrder, endpoint);
      res.status(201).send(result);
    } catch (error) {
      if (missingParams.length > 0) {
        res
          .status(400)
          .send({ message: `Missing '${missingParams}' in request body` });
      }
    }
  });

ordersRouter
  .route('/:id')
  .all(async (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get('db');
    try {
      const result = await RouteService.getById(db, id, endpoint);
      foundJob = result;
      next();
    } catch (error) {
      res.status(404).json({
        error: { message: `Order with id ${id} does not exist.` },
        more: error,
      });
    }
  })
  .get(async (req, res) => {
    res.send(foundJob);
  })
  .put(jsonParser, async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const { type, date_requested, zip } = req.body;
    const newJob = { type, date_requested, zip };
    const numOfVals = Object.values(newJob).filter(Boolean).length;
    if (numOfVals === 0) {
      res.status(400).json({
        error: {
          message:
            "Request body must contain either 'type', 'date_requested' or 'zip'",
        },
      });
    }
    try {
      const result = await RouteService.update(db, id, newJob, endpoint);
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
      res.status(204).send({ message: `Deleted job with id: ${jobId}` });
    } catch (error) {
      res.send(error);
    }
  });

module.exports = ordersRouter;

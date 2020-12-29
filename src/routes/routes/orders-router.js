const express = require('express');
const RouteService = require('../route-service');
const { numberOfValues, missingPostParams } = require('../helpers');
const table = 'orders';
const ordersRouter = express.Router();

ordersRouter
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
    const { type, date_requested, zip, items } = req.body;
    const newOrder = {
      type,
      date_requested,
      zip,
      items,
    };
    console.log(newOrder);
    const missingParams = missingPostParams(newOrder);
    try {
      if (missingParams.length > 0) {
        throw { message: `Body has missing fields: ${missingParams}.` };
      }
      const result = await RouteService.insert(db, newOrder, table);
      res.status(201).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  });

ordersRouter
  .route('/:id')
  .all(async (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;
    try {
      const result = await RouteService.getById(db, id, table);
      foundOrder = result;
      next();
    } catch (error) {
      res.status(404).json({ error: `Order with id ${id} does not exist.` });
    }
  })
  .get(async (req, res) => {
    res.status(200).send(foundOrder);
  })
  .put(async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const { type, date_requested, zip } = req.body;
    const newOrder = { type, date_requested, zip };
    const checkBody = numberOfValues(newOrder);
    try {
      if (checkBody === 0) {
        throw { message: 'Must submit at least one field.' };
      }
      const result = await RouteService.update(db, id, newOrder, table);
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
      const orderId = result[0]._id;
      res.status(200).send({ message: `Deleted order with id: ${orderId}` });
    } catch (error) {
      res.status(404).send({ message: `Worker with ${id} does not exist` });
    }
  });

module.exports = ordersRouter;

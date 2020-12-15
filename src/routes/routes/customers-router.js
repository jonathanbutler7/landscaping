const express = require('express');
const RouteService = require('../route-service');
const { numberOfValues, missingPostParams } = require('../helpers');
const table = 'customers';
const customersRouter = express.Router();

customersRouter
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
    const { name, email, phone, address } = req.body;
    const newCustomer = {
      name,
      email,
      phone,
      address,
    };
    const missingParams = missingPostParams(newCustomer);
    try {
      if (missingParams.length > 0) {
        throw { message: `Body has missing fields: ${missingParams}.` };
      }
      const result = await RouteService.insert(db, newCustomer, table);
      res.status(201).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  });

customersRouter
  .route('/:id')
  .all(async (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;
    try {
      const result = await RouteService.getById(db, id, table);
      foundCustomer = result;
      if (!foundCustomer.length) {
        throw `Customer with id ${id} does not exist.`;
      }
      next();
    } catch (error) {
      res.status(404).send({ error: `Customer with id ${id} does not exist.` });
    }
  })
  .get(async (req, res) => {
    res.status(200).send(foundCustomer);
  })
  .put(async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    const newCustomer = { name, email, phone, address };
    const checkBody = numberOfValues(newCustomer)
    try {
      if (checkBody === 0) {
        throw { message: 'Must submit at least one field.' };
      }
      const result = await RouteService.update(db, id, newCustomer, table);
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
      const customerId = result[0]._id;
      res
        .status(200)
        .send({ message: `Deleted customer with id: ${customerId}` });
    } catch (error) {
      res.status(404).send({ message: `Customer with ${id} does not exist` });
    }
  });

module.exports = customersRouter;

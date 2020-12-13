const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const loginRouter = express.Router();
const RouteService = require('./route-service');
const table = 'users';

loginRouter.post('/', async (req, res) => {
  const db = req.app.get('db');
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPassword };
  console.log(newUser);
  try {
    const result = await RouteService.insert(db, newUser, table);
    res.status(201).send(result);
  } catch (error) {
    res.status(404).send({ error: error });
  }
});

loginRouter.get('/', async (req, res) => {
  const db = req.app.get('db');
  const { email } = req.body;
  try {
    const result = await RouteService.getByEmail(db, email, table);
    res.status(201).send(result);
  } catch (error) {
    res.send({ error: error });
  }
});

loginRouter.delete('/', async (req, res) => {
  const db = req.app.get('db');
  const { email } = req.body;
  try {
    const result = await RouteService.delete(db, email, table);
    res.status(201).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

loginRouter.post('/', async (req, res) => {});
module.exports = loginRouter;

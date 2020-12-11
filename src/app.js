require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const app = express();
const jobsRouter = require('./routes/jobs-router');
const customersRouter = require('./routes/customers-router');
const techniciansRouter = require('./routes/technicians-router');

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use('/jobs', jobsRouter);
app.use('/customers', customersRouter);
app.use('/technicians', techniciansRouter);

app.get('/', (req, res) => {
  res.send('Hello, boilerplate!');
});

app.use((error, res) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;

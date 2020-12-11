require('dotenv').config();
const { validateBearerToken, throwError } = require('./helpers');
const { NODE_ENV } = require('./config');
const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const jobsRouter = require('./routes/jobs-router');
const customersRouter = require('./routes/customers-router');
const techniciansRouter = require('./routes/technicians-router');

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(validateBearerToken);

app.use('/jobs', jobsRouter);
app.use('/customers', customersRouter);
app.use('/technicians', techniciansRouter);

app.use(throwError);

module.exports = app;

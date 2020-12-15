require('dotenv').config();
const { validateBearerToken, throwError } = require('./helpers');
const { NODE_ENV } = require('./config');
const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const routes = require('./routes/index')

app.use(morgan(morganOption));
app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(validateBearerToken);
app.use(routes);

app.use(throwError);

module.exports = app;

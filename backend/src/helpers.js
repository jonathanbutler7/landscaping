const { API_TOKEN, NODE_ENV } = require('./config');

function validateBearerToken(req, res, next) {
  const apiToken = API_TOKEN;
  const authToken = req.get('Authorization');
  if (!authToken || authToken !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  next();
}

function throwError(error, res) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.toString() };
  }
  res.status(500).json(response);
}

module.exports = { validateBearerToken, throwError };

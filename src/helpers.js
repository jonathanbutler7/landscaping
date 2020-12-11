const { API_TOKEN } = require('./config');

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
      console.error(error);
      response = { message: error.message, error };
    }
    res.status(500).json(response);
  }

module.exports = { validateBearerToken, throwError }
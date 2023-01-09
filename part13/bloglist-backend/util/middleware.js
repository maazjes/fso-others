const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');
const { ActiveSession, User } = require('../models');

const errorHandler = (error, request, response, next) => {
  console.log('error name', error.name);
  console.error('error message', error.message);

  if (error.name === 'SequelizeValidationError') {
    let msg = 'missing arguments';
    if (error.message === 'Validation error: Validation isEmail on username failed') {
      msg = 'username is not a valid email address';
    }
    if (error.message === 'Validation error: Validation max on year failed') {
      msg = 'year must be smaller than ' + new Date().getFullYear();
    }
    if (error.message === 'Validation error: Validation min on year failed') {
      msg = 'year must be bigger than 1991';
    }
    return response.status(400).send({ error: msg });
  }

  if (error.message === 'invalid token') {
    return response.status(401).json({ error: 'token invalid' });
  }
  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: 'malformatted arguments' });
  }
  if (error.name === 'SyntaxError') {
    return response.status(400).send({ error: 'invalid syntax' });
  }

  next(error);
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');
  if (!(authorization && authorization.toLowerCase().startsWith('bearer '))) {
    return res.status(401).json({ error: 'token missing' });
  }
  const token = authorization.substring(7);
  const decodedToken = jwt.verify(token, SECRET);
  const active = await ActiveSession.findOne({
    where: { token },
    include: {
      model: User,
      attributes: ['disabled']
    }
  });
  if (!active) {
    return res.status(401).json({ error: 'token is not active' });
  }
  if (active.user.disabled) {
    return res.status(401).json({ error: 'user is disabled' });
  }
  req.decodedToken = decodedToken;
  next();
};

module.exports = { errorHandler, tokenExtractor };

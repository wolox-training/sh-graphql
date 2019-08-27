const { validateToken } = require('../utils');
const errors = require('../errors');
const logger = require('../logger');

exports.validateSession = (args, { authorization }) => {
  if (authorization) {
    return validateToken(authorization)
      .then(user => {
        args.user = user;
        return args;
      })
      .catch(error => {
        logger.error(`Error authenticating user. Details: ${JSON.stringify(error.message)}`);
        throw errors.sessionError(`Session error. Details: ${JSON.stringify(error)}`);
      });
  }
  throw errors.sessionError('Session error, the token has not been provided');
};

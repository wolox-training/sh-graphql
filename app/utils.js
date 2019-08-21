const bcrypt = require('bcrypt');

const { salt_rounds } = require('../config').common.session;
const errors = require('./errors');
const logger = require('./logger');

exports.passwordEncryption = user =>
  bcrypt
    .hash(user.password, salt_rounds)
    .then(password => ({
      ...user,
      password
    }))
    .catch(error => {
      logger.error(`Error trying to encrypt the password. Details: ${JSON.stringify(error)}`);
      throw errors.encryptionError('Error trying to encrypt the password');
    });

exports.errorBuilder = (message, field, errorList) => {
  logger.error(message);
  errorList.push({ field, message });
};

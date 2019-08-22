const { user: User } = require('../models');
const { DATABASE_ERROR, LOG_DATABASE_ERROR } = require('../constants');
const logger = require('../logger');
const errors = require('../errors');

exports.userRegister = user =>
  User.createModel(user).catch(error => {
    logger.error(`${LOG_DATABASE_ERROR}${JSON.stringify(error)}`);
    throw errors.databaseError(`${DATABASE_ERROR}`);
  });

exports.getUser = user =>
  User.getOne(user).catch(error => {
    logger.error(`${LOG_DATABASE_ERROR}${JSON.stringify(error)}`);
    throw errors.databaseError(`${DATABASE_ERROR}`);
  });

exports.getUsers = () =>
  User.getAll().catch(error => {
    logger.error(`${LOG_DATABASE_ERROR}${JSON.stringify(error)}`);
    throw errors.databaseError(`${DATABASE_ERROR}`);
  });

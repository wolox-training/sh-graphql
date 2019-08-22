const logger = require('../../logger');
const userService = require('../../services/users');
const { passwordEncryption } = require('../../utils');

exports.userRegister = (parent, { userFields: user }) => {
  logger.info(`userRegister method start, user to register: ${user.firstName} ${user.lastName}`);
  return passwordEncryption(user)
    .then(userToCreate => userService.userRegister(userToCreate))
    .then(userCreated => {
      logger.info(`User ${userCreated.firstName} ${userCreated.lastName} created successfully`);
      return userCreated;
    })
    .catch(error => {
      logger.error(`Error trying to create user. Details: ${JSON.stringify(error)}`);
    });
};

exports.getUser = (parent, args) => {
  logger.info(`getUser method start, user to find: ${JSON.stringify(args)}`);
  return userService.getUser(args).catch(error => {
    logger.error(`Error trying to find the user. Details: ${JSON.stringify(error)}`);
  });
};

exports.getUsers = () => {
  logger.info('getUsers method start, fetching user list');
  return userService.getUsers().catch(error => {
    logger.error(`Error trying to fetching users. Details: ${JSON.stringify(error)}`);
  });
};

exports.fullNameResolver = {
  fullName: root => `${root.firstName} ${root.lastName}`
};

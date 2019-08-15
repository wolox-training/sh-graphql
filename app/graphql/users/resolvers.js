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
    });
};

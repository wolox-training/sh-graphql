const logger = require('../../logger');
const userService = require('../../services/users');
const { passwordEncryption, comparePasswords, generateToken } = require('../../utils');
const { userLoggedIn } = require('../events');
const { tokenSerializer } = require('../serializers/authentication');
const errors = require('../../errors');

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
      throw error;
    });
};

exports.getUser = (parent, args) => {
  logger.info(`getUser method start, user to find: ${JSON.stringify(args)}`);
  return userService.getUser(args).catch(error => {
    logger.error(`Error trying to find the user. Details: ${JSON.stringify(error)}`);
    throw error;
  });
};

exports.getUsers = () => {
  logger.info('getUsers method start, fetching user list');
  return userService.getUsers().catch(error => {
    logger.error(`Error trying to fetching users. Details: ${JSON.stringify(error)}`);
    throw error;
  });
};

exports.userSignIn = (parent, { credentials: user }) => {
  logger.info('userSignIn method start, user authentication');
  const { email, password } = user;
  return userService
    .getUser({ email })
    .then(foundUser => {
      if (foundUser) {
        return comparePasswords({ password, hash: foundUser.password }).then(registered =>
          registered ? generateToken(foundUser) : false
        );
      }
      return false;
    })
    .then(token => {
      if (token) {
        userLoggedIn.publish(email);
        return tokenSerializer(token);
      }
      throw errors.sessionError('Your email or password is incorrect');
    })
    .catch(error => {
      logger.error(`Error trying to login. Details: ${JSON.stringify(error)}`);
      throw error;
    });
};

exports.fullNameResolver = {
  fullName: root => `${root.firstName} ${root.lastName}`
};

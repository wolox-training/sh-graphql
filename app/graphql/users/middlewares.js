const logger = require('../../logger');
const { user: User } = require('../../models');
const { EMAIL_REGEX, PASSWORD_REGEX } = require('../../constants');
const errors = require('../../errors');

const user = (resolve, root, args) => {
  logger.info("Middleware for 'user' mutation");
  const errorList = [];
  const { email, password } = args.userFields;
  if (!EMAIL_REGEX.test(email)) {
    logger.error('The email used does not belong to Wolox dominoes');
    errorList.push({
      field: 'email',
      message: 'The email does not belong to the Wolox domains',
      statusCode: 400
    });
  }
  if (!PASSWORD_REGEX.test(password)) {
    logger.error('The password must be alphanumeric and should be at least 8 chars long');
    errorList.push({
      field: 'password',
      message: 'The password must be alphanumeric and should be at least 8 chars long',
      statusCode: 400
    });
  }
  return User.getOne({ conditions: { email } })
    .then(foundUser => {
      if (foundUser) {
        logger.error('The email of the user you want to register is already in use');
        errorList.push({
          field: 'password',
          message: 'The email is already registered',
          statusCode: 400
        });
      }
    })
    .then(() => {
      if (errorList.length > 0) {
        throw errors.invalidInputs('invalid user inputs', errorList);
      }
      return resolve(root, args);
    });
};

module.exports = {
  // Here you add all the middlewares for the mutations, queries or field resolvers if you have any
  mutations: {
    user
  }
};

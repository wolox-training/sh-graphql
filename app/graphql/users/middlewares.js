const logger = require('../../logger');
const { user: User } = require('../../models');
const {
  EMAIL_REGEX,
  EMAIL_ERROR,
  EMAIL_DB_ERROR,
  EMAIL_FIELD,
  PASSWORD_REGEX,
  PASSWORD_ERROR,
  PASSWORD_FIELD
} = require('../../constants');
const errors = require('../../errors');
const { errorBuilder } = require('../../utils');

const user = (resolve, root, args) => {
  logger.info("Middleware for 'user' mutation");
  const errorList = [{ statusCode: 400 }];
  const { email, password } = args.userFields;
  if (!EMAIL_REGEX.test(email)) {
    errorBuilder(EMAIL_ERROR, EMAIL_FIELD, errorList);
  }
  if (!PASSWORD_REGEX.test(password)) {
    errorBuilder(PASSWORD_ERROR, PASSWORD_FIELD, errorList);
  }
  return User.getOne({ email })
    .then(foundUser => {
      if (foundUser) {
        errorBuilder(EMAIL_DB_ERROR, EMAIL_FIELD, errorList);
      }
    })
    .then(() => {
      if (errorList.length > 1) {
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

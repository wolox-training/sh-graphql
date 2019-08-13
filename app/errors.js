const { ApolloError, UserInputError } = require('apollo-server');

const createError = (message, statusCode) => new ApolloError(message, statusCode);

const DEFAULT_ERROR = 500,
  BAD_REQUEST = 400,
  ALBUM_API_FAILED = 503;

exports.defaultError = message => createError(message, DEFAULT_ERROR);
exports.badRequest = message => createError(message, BAD_REQUEST);
exports.albumError = message => createError(message, ALBUM_API_FAILED);
exports.invalidInputs = (message, invalidInputs) => new UserInputError(message, { invalidInputs });
exports.encryptionError = message => createError(message, DEFAULT_ERROR);
exports.databaseError = message => createError(message, DEFAULT_ERROR);

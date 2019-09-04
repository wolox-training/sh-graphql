const crypto = require('crypto');
const { algorithm, digest } = require('../../config').common.crypto;

exports.generatorHashKey = (fieldName, args, parent = '') =>
  crypto
    .createHash(algorithm)
    .update(`${fieldName}:${JSON.stringify(args)}:${JSON.stringify(parent)}`)
    .digest(digest);

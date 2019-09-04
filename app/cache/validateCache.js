/* eslint-disable max-params */
const { cache } = require('../cache');
const { generatorHashKey } = require('../helpers/cache');
const { ttl } = require('../../config').common.redisCaching;
const logger = require('../logger');

exports.findInCache = (resolve, parent, args, contex, info) => {
  const { fieldName } = info;
  const hashKey =
    fieldName === 'photos' ? generatorHashKey(fieldName, args, parent) : generatorHashKey(fieldName, args);
  return cache.get(hashKey).then(cached => {
    if (cached) {
      const parsedCache = JSON.parse(cached);
      logger.info(`${fieldName} data recovered from the cache`);
      return parsedCache;
    }
    return resolve(parent, args, contex, info).then(response => {
      cache.set(hashKey, JSON.stringify(response), { ttl });
      return response;
    });
  });
};

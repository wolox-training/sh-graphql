const { RedisCache } = require('apollo-server-cache-redis');

const { host, port } = require('../../config').common.redisCaching;

exports.cache = new RedisCache({
  host,
  port
});

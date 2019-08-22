const { queries, schema: queriesSchema } = require('./queries'),
  { mutations, schema: mutationSchema } = require('./mutations'),
  { subscriptions, schema: subscriptionsSchema } = require('./subscriptions'),
  middlewares = require('./middlewares'),
  { fullNameResolver } = require('./resolvers');

module.exports = {
  queries,
  mutations,
  fullNameResolver,
  subscriptions,
  middlewares,
  schemas: [queriesSchema, mutationSchema, subscriptionsSchema]
};

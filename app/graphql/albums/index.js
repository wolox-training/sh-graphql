const { queries, schema: queriesSchema } = require('./queries');
const { mutations, schema: mutationSchema } = require('./mutations');
const { photosResolver } = require('./resolvers');
const middlewares = require('./middlewares');

module.exports = {
  queries,
  mutations,
  middlewares,
  photosResolver,
  schemas: [queriesSchema, mutationSchema]
};

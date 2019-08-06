const { queries, schema: queriesSchema } = require('./queries');
const { photosResolver } = require('./resolvers');

module.exports = {
  queries,
  photosResolver,
  schemas: [queriesSchema]
};

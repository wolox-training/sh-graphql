const { makeExecutableSchema } = require('graphql-tools'),
  { applyMiddleware } = require('graphql-middleware'),
  types = require('./types'),
  inputs = require('./inputs'),
  users = require('./users'),
  albums = require('./albums'),
  healthCheck = require('./healthCheck');

const typeDefs = [types, inputs, ...users.schemas, ...albums.schemas, ...healthCheck.schemas];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      ...users.queries,
      ...albums.queries,
      ...healthCheck.queries
    },
    Mutation: {
      ...users.mutations
    },
    Subscription: {
      ...users.subscriptions
    },
    Album: {
      ...albums.photosResolver
    }
  }
});

module.exports = applyMiddleware(schema, {
  Mutation: {
    ...users.middlewares.mutations
  }
});

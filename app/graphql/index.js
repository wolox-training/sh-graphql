const { makeExecutableSchema } = require('graphql-tools'),
  { applyMiddleware } = require('graphql-middleware'),
  types = require('./types'),
  inputs = require('./inputs'),
  users = require('./users'),
  albums = require('./albums'),
  healthCheck = require('./healthCheck'),
  enums = require('./enums');

const typeDefs = [types, inputs, enums, ...users.schemas, ...albums.schemas, ...healthCheck.schemas];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      ...users.queries,
      ...albums.queries,
      ...healthCheck.queries
    },
    Mutation: {
      ...users.mutations,
      ...albums.mutations
    },
    Subscription: {
      ...users.subscriptions
    },
    Album: {
      ...albums.photosResolver
    },
    User: {
      ...users.fullNameResolver
    }
  }
});

const schemeAppliedMiddlewares = applyMiddleware(schema, {
  Mutation: {
    ...users.middlewares.mutations,
    ...albums.middlewares.mutations
  },
  Query: {
    ...albums.middlewares.queries
  },
  Album: {
    ...albums.middlewares.photosResolver
  }
});

module.exports = {
  schema: schemeAppliedMiddlewares,
  context: ({ req }) => ({ authorization: req.headers.authorization || '' })
};

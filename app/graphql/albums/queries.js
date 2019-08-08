const { gql } = require('apollo-server');

const { getAlbum } = require('./resolvers');

module.exports = {
  queries: {
    album: getAlbum
  },
  schema: gql`
    extend type Query {
      album(id: ID!): Album!
    }
  `
};

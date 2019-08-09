const { gql } = require('apollo-server');

const { getAlbum, getAlbums } = require('./resolvers');

module.exports = {
  queries: {
    album: getAlbum,
    albums: getAlbums
  },
  schema: gql`
    extend type Query {
      album(id: ID!): Album!
      albums(offset: Int = 0, limit: Int = 5, orderBy: AlbumsOrderByInput = id): [Album]!
    }
  `
};

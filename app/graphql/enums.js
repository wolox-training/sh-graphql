const { gql } = require('apollo-server');

module.exports = gql`
  enum AlbumsOrderByInput {
    id
    title
    artist
  }

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
`;

const { gql } = require('apollo-server');

const resolver = require('./resolvers');

module.exports = {
  mutations: {
    buyAlbum: resolver.buyAlbum
  },
  schema: gql`
    extend type Mutation {
      buyAlbum(albumId: ID!): Album!
    }
  `
};

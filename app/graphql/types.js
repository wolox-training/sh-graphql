const { gql } = require('apollo-server');

module.exports = gql`
  type Query
  type Mutation
  type Subscription
  type User {
    id: ID!
    fullName: String!
    firstName: String @deprecated(reason: "Use 'fullName instead'")
    lastName: String @deprecated(reason: "Use 'fullName instead'")
    email: String!
    password: String!
  }
  type AccessToken {
    accessToken: String!
    refreshToken: String!
    expiresIn: String!
  }
  type Album {
    id: ID!
    title: String!
    artist: String!
    photos: [Photo]!
  }
  type Photo {
    albumId: ID!
    id: ID!
    title: String!
    url: String!
    thumbnailUrl: String!
  }
`;

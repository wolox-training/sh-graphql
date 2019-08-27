const { gql } = require('apollo-server'),
  { userRegister, userSignIn } = require('../users/resolvers');

module.exports = {
  mutations: {
    user: userRegister,
    login: userSignIn
  },
  schema: gql`
    extend type Mutation {
      user(userFields: UserInput!): User!
      login(credentials: LoginInput!): AccessToken
    }
  `
};

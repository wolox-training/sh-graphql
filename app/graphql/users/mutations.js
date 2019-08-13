const { gql } = require('apollo-server'),
  { userLoggedIn } = require('../events'),
  { userRegister } = require('../users/resolvers');

module.exports = {
  mutations: {
    user: userRegister,
    login: (_, { credentials }) => {
      // IMPORTANT: Not a functional login, its just for illustrative purposes
      userLoggedIn.publish(credentials.username);
      return {
        accessToken: 'example_token',
        refreshToken: 'example_refresh_token',
        expiresIn: 134567899123
      };
    }
  },
  schema: gql`
    extend type Mutation {
      user(userFields: UserInput!): User!
      login(credentials: LoginInput!): AccessToken
    }
  `
};

const { gql } = require('apollo-server');
const { getUser, getUsers } = require('./resolvers');

module.exports = {
  queries: {
    user: getUser,
    users: getUsers
  },
  schema: gql`
    extend type Query {
      user(id: ID, firstName: String, email: String): User!
      users: [User]
    }
  `
};

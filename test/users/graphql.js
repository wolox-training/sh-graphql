const { gql } = require('apollo-server');

const getUser = id => gql`
    query {
        user(id: ${id}) {
          fullName
          email
        }
      }`;

const getUsers = () => gql`
  query {
    users {
      fullName
      email
    }
  }
`;

const createUser = userInput => ({
  mutation: gql`
    mutation createUser($userInput: UserInput!) {
      user(userFields: $userInput) {
        fullName
        id
        password
        email
      }
    }
  `,
  variables: { userInput }
});

module.exports = { getUser, getUsers, createUser };

const { gql } = require('apollo-server-express');

module.exports.typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
  }

  type Query {
      getAll: [User]
  }
`;

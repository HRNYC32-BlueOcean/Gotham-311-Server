const { gql } = require('apollo-server-express');

module.exports.typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    phone: String
    createdAt: String
    updatedAt: String
  }

  type Issue {
    id: ID!
    type: String
    title: String
    description: String
    reported_count: Float
    task_owner: String
    user_id: Float
    lat: Float
    lng: Float
    upvotes_count: Float
    resolution_status: Float
    confirm_resolved_count: Float
    date_marked_in_progress: String
    date_marked_resolved: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): [User]
    getIssues: [Issue]
    getIssue(id: ID!): [Issue]
  }

  type Mutation {
    createUser(name: String!, email: String!, phone: String!): User
    updateUser(id: ID!, name: String, email: String, phone: String): [Float]
    deleteUser(id: ID!): Float

    createIssue(
      type: String
      title: String
      description: String
      reported_count: Float
      task_owner: String
      user_id: Float
      lat: Float
      lng: Float
      upvotes_count: Float
      resolution_status: Float
      confirm_resolved_count: Float
      date_marked_in_progress: String
      date_marked_resolved: String
    ): Issue

    updateIssue(
      id: ID!
      type: String
      title: String
      description: String
      reported_count: Float
      task_owner: String
      user_id: Float
      lat: Float
      lng: Float
      upvotes_count: Float
      resolution_status: Float
      confirm_resolved_count: Float
      date_marked_in_progress: String
      date_marked_resolved: String
    ): [Float]

    deleteIssue(id: ID!): Float
  }
`;

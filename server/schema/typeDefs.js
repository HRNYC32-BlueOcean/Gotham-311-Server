const { gql } = require('apollo-server-express');

module.exports.typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    phone: String
  }

  type Issues {
    id: ID!
    description: String
    reported_count: Float
    task_owner: String
    username: String
    user_id: Float
    lat: Float
    lng: Float
    upvotes_count: Float
    resolution_status: Float
    confirm_resolved_count: Float
    createdAt: String
    date_marked_in_progress: String
    date_marked_resolved: String
  }

  type Query {
    getAll: [User]
  }
`;

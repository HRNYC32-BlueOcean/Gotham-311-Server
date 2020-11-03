const { gql } = require('apollo-server');

module.exports.typeDefs = gql`
  type User {
    id: ID
    first_name: String
    last_name: String
    email: String
    phone: String
    points: Float
    reported_count: Float
    banned: Boolean
    createdAt: String
    updatedAt: String
    issues: [Issue]
  }

  type Issue {
    id: ID
    title: String
    description: String
    user_id: Float
    type_id: Float
    borough_id: Float
    resolution_status_id: Float
    reported_count: Float
    upvotes_count: Float
    confirm_resolved_count: Float
    date_marked_in_progress: String
    date_marked_resolved: String
    createdAt: String
    updatedAt: String
    type: Type
    user: User
    borough: Type
    coordinates: Coordinates
    resolution_status: Resolution_Status
  }

  type Type {
    id: ID
    name: String
  }

  type Coordinates {
    id: ID
    lat: Float
    lng: Float
  }

  type Resolution_Status {
    id: ID
    status: String
  }

  type TopIssues {
    manhattan: [Issue]
    brooklyn: [Issue]
    queens: [Issue]
    bronx: [Issue]
    staten_island: [Issue]
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): [User]
    getIssues: [Issue]
    getIssue(id: ID!): [Issue]
    getTypes: [Type]
    getType(id: ID!): [Type]
    getCoordinates: [Coordinates]
    getCoordinate(id: ID!): [Coordinates]
    getResolution_Statuses: [Resolution_Status]
    getResolution_Status(id: ID!): [Resolution_Status]
    getBoroughs: [Type]
    getBorough(id: ID!): [Type]
    topIssues(count: Float): [TopIssues]
  }

  type Mutation {
    createUser(name: String!, email: String!, phone: String!): User
    updateUser(id: ID!, name: String, email: String, phone: String): [Float]
    deleteUser(id: ID!): Float

    createIssue(
      title: String
      description: String
      user_id: Float
      type_id: Float
      lat: Float
      lng: Float
      reported_count: Float
      upvotes_count: Float
      resolution_status: Float
      confirm_resolved_count: Float
      date_marked_in_progress: String
      date_marked_resolved: String
    ): Issue

    updateIssue(
      id: ID!
      title: String
      description: String
      task_owner: String
      user_id: Float
      type_id: String
      lat: Float
      lng: Float
      reported_count: Float
      upvotes_count: Float
      resolution_status: Float
      confirm_resolved_count: Float
      date_marked_in_progress: String
      date_marked_resolved: String
    ): [Float]

    deleteIssue(id: ID!): Float

    updateCoordinates(id: ID!, lat: Float, lng: Float): [Coordinates]
  }
`;

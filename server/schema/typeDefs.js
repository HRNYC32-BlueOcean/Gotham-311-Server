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
    create_date: String
    issues: [Issue]
  }

  type Issue {
    id: ID
    title: String
    description: String
    user_id: Float
    issue_type_id: Float
    borough_id: Float
    resolution_status_id: Float
    coordinates_id: Float
    photo_url: String
    reported_count: Float
    upvotes_count: Float
    confirm_resolved_count: Float
    confirm_not_resolved_count: Float
    date_marked_in_progress: String
    date_marked_resolved: String
    create_date: String
    type: Type
    user: User
    borough: Type
    coordinates: Coordinates
    resolution_status: Type
  }

  type Interaction {
    id: ID
    create_date: String
    user_id: Float
    issue_id: Float
    interaction_type_id: Float
    coordinates_id: Float
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

  type TopIssues {
    manhattan: [Issue]
    brooklyn: [Issue]
    queens: [Issue]
    bronx: [Issue]
    staten_island: [Issue]
  }

  type Count {
    open: Float
    in_progress: Float
    resolved: Float
  }

  type IssuesCountByBorough {
    manhattan: Count
    brooklyn: Count
    queens: Count
    bronx: Count
    staten_island: Count
  }

  type IssuesCountByPeriod {
    oneDayAgo: Count
    twoDaysAgo: Count
    threeDaysAgo: Count
    fourDaysAgo: Count
    fiveDaysAgo: Count
    sixDaysAgo: Count
    sevenDaysAgo: Count
  }

  type InteractionCount {
    IssuePosts: Float
    IssueReports: Float
    IssueUpvotes: Float
    IssueResolved: Float
  }

  type InteractionCountByPeriod {
    oneDayAgo: InteractionCount
    twoDaysAgo: InteractionCount
    threeDaysAgo: InteractionCount
    fourDaysAgo: InteractionCount
    fiveDaysAgo: InteractionCount
    sixDaysAgo: InteractionCount
    sevenDaysAgo: InteractionCount
  }

  type Query {
    getUsers: [User]
    getUser(id: ID, email: String): [User]
    getIssues: [Issue]
    getIssue(id: ID!): [Issue]
    getTypes: [Type]
    getType(id: ID!): [Type]
    getCoordinates: [Coordinates]
    getCoordinate(id: ID!): [Coordinates]
    getResolution_Statuses: [Type]
    getResolution_Status(id: ID!): [Type]
    getBoroughs: [Type]
    getBorough(id: ID!): [Type]
    getInteraction(user_id: Float!): [Interaction]
    getInteractions: [Interaction]
    topIssues(count: Float): TopIssues
    issuesByBorough(period: String): IssuesCountByBorough
    getInteractionsByPeriod(
      one: String
      two: String
      three: String
      four: String
      five: String
      six: String
      seven: String
    ): InteractionCountByPeriod

    getIssuesByPeriod(
      one: String
      two: String
      three: String
      four: String
      five: String
      six: String
      seven: String
    ): IssuesCountByPeriod

    getSortedIssues(
      borough_id: Float
      by: String
      order: String
      offset: Float
      limit: Float
    ): [Issue]

    getSortedUsers(by: String, order: String, offset: Float, limit: Float): [User]

    getIssuesByCoordinates(
      upperLat: Float!
      underLat: Float!
      upperLng: Float!
      underLng: Float!
    ): [Issue]
  }

  type Mutation {
    createUser(first_name: String!, last_name: String!, email: String!, phone: String!): User
    updateUser(
      id: ID!
      first_name: String
      last_name: String
      email: String
      phone: String
      points: Float
      reported_count: Float
      banned: Boolean
    ): [Float]

    deleteUser(id: ID!): Float

    createIssue(
      title: String
      description: String
      photo_url: String
      user_id: Float
      issue_type_id: Float
      borough_id: Float
      lat: Float
      lng: Float
    ): Issue

    updateIssue(
      id: ID!
      reported_count: Float
      upvotes_count: Float
      resolution_status_id: Float
      confirm_resolved_count: Float
      confirm_not_resolved_count: Float
      date_marked_in_progress: String
      date_marked_resolved: String
    ): [Float]

    deleteIssue(id: ID!): Float

    postInteraction(
      user_id: Float!
      issue_id: Float!
      interaction_type_id: Float!
      lat: Float!
      lng: Float!
    ): Interaction
  }
`;

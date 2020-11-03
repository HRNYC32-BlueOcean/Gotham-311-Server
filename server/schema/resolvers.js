const {
  User,
  Issue,
  Type,
  Coordinates,
  Borough,
  Resolution_Status,
} = require('../../db/models.js');

module.exports.resolvers = {
  Query: {
    getUsers: (parent, args, context) => {
      return User.findAll({ raw: true });
    },
    getUser: (parent, args, context) => {
      return User.findAll({ where: args, raw: true });
    },
    getIssues: () => {
      return Issue.findAll({ raw: true });
    },
    getIssue: (parent, args, context) => {
      return Issue.findAll({ where: args, raw: true });
    },
    getTypes: (parent, args, context) => {
      return Type.findAll({ raw: true });
    },
    getType: (parent, args, context) => {
      return Type.findAll({ where: args, raw: true });
    },
    getCoordinates: (parent, args, context) => {
      return Coordinates.findAll({ raw: true });
    },
    getCoordinate: (parent, args, context) => {
      return Coordinates.findAll({ where: args, raw: true });
    },
    getResolution_Statuses: (parent, args, context) => {
      return Resolution_Status.findAll({ raw: true });
    },
    getResolution_Status: (parent, args, context) => {
      return Resolution_Status.findAll({ where: args, raw: true });
    },
    getBoroughs: (parent, args, context) => {
      return Borough.findAll({ raw: true });
    },
    getBorough: (parent, args, context) => {
      return Borough.findAll({ where: args, raw: true });
    },
  },

  User: {
    issues: (root) => {
      return Issue.findAll({ where: { user_id: root.id } });
    },
  },

  Issue: {
    type: (root) => {
      return Type.findAll({ where: { id: root.type_id }, raw: true, plain: true });
    },
    user: (root) => {
      return User.findAll({ where: { id: root.user_id }, raw: true, plain: true });
    },
    coordinates: (root) => {
      return Coordinates.findAll({ where: { id: root.id }, raw: true, plain: true });
    },
    borough: (root) => {
      return Borough.findAll({ where: { id: root.borough_id }, raw: true, plain: true });
    },
    resolution_status: (root) => {
      return Resolution_Status.findAll({
        where: { id: root.resolution_status_id },
        raw: true,
        plain: true,
      });
    },
  },

  TopIssues: {
    manhattan: (root) => {
      return Issue.findAll({
        where: { borough_id: 1 },
        order: [['upvotes_count', 'DESC']],
        limit: root.count,
        raw: true,
      });
    },
    brooklyn: (root) => {
      return Issue.findAll({
        where: { borough_id: 2 },
        order: [['upvotes_count', 'DESC']],
        limit: root.count,
      });
    },
    queens: (root) => {
      return Issue.findAll({
        where: { borough_id: 3 },
        order: [['upvotes_count', 'DESC']],
        limit: root.count,
      });
    },
    bronx: (root) => {
      return Issue.findAll({
        where: { borough_id: 5 },
        order: [['upvotes_count', 'DESC']],
        limit: root.count,
      });
    },
    staten_island: (root) => {
      return Issue.findAll({
        where: { borough_id: 5 },
        order: [['upvotes_count', 'DESC']],
        limit: root.count,
      });
    },
  },

  Mutation: {
    createUser: (parent, args, context) => {
      return User.create(args);
    },
    updateUser: (parent, args, context) => {
      return User.update(args, {
        where: { id: args.id },
        raw: true,
      });
    },
    deleteUser: (parent, args, context) => {
      return User.destroy({ where: { id: args.id } });
    },
    createIssue: (parent, args, context) => {
      return Issue.create(args);
    },
    updateIssue: (parent, args, context) => {
      return Issue.update(args, {
        where: { id: args.id },
        raw: true,
      });
    },
    deleteIssue: (parent, args, context) => {
      return Issue.destroy({ where: { id: args.id } });
    },
  },
};

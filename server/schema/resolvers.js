const { Op } = require('sequelize');
const {
  User,
  Issue,
  Issue_Type,
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
    topIssues: (parent, args, context) => {
      return args;
    },
    issuesByBorough: (parent, args, context) => {
      return args;
    },
    getSortedIssues: (parent, args, context) => {
      if (args.borough_id) {
        return Issue.findAll({
          where: { borough_id: args.borough_id },
          order: [[args.by, args.order]],
          offset: args.offset || 0,
          limit: args.limit || 20,
        });
      }
      return Issue.findAll({
        order: [[args.by, args.order]],
        offset: args.offset || 0,
        limit: args.limit || 20,
      });
    },
  },

  User: {
    issues: (root) => {
      return Issue.findAll({ where: { user_id: root.id } });
    },
  },

  Issue: {
    type: (root) => {
      return Issue_Type.findAll({ where: { id: root.type_id }, raw: true, plain: true });
    },
    user: (root) => {
      return User.findAll({ where: { id: root.user_id }, raw: true, plain: true });
    },
    coordinates: (root) => {
      return Coordinates.findAll({ where: { id: root.coordinates_id }, raw: true, plain: true });
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
        where: {
          borough_id: 1,
          [Op.or]: [{ resolution_status_id: 1 }, { resolution_status_id: 2 }],
        },
        order: [['upvotes_count', 'DESC']],
        limit: root.count,
        raw: true,
      });
    },
    brooklyn: (root) => {
      return Issue.findAll({
        where: {
          borough_id: 2,
          [Op.or]: [{ resolution_status_id: 1 }, { resolution_status_id: 2 }],
        },
        order: [['upvotes_count', 'DESC']],
        limit: root.count,
      });
    },
    queens: (root) => {
      return Issue.findAll({
        where: {
          borough_id: 3,
          [Op.or]: [{ resolution_status_id: 1 }, { resolution_status_id: 2 }],
        },
        order: [['upvotes_count', 'DESC']],
        limit: root.count,
      });
    },
    bronx: (root) => {
      return Issue.findAll({
        where: {
          borough_id: 4,
          [Op.or]: [{ resolution_status_id: 1 }, { resolution_status_id: 2 }],
        },
        order: [['upvotes_count', 'DESC']],
        limit: root.count,
      });
    },
    staten_island: (root) => {
      return Issue.findAll({
        where: {
          borough_id: 5,
          [Op.or]: [{ resolution_status_id: 1 }, { resolution_status_id: 2 }],
        },
        order: [['upvotes_count', 'DESC']],
        limit: root.count,
      });
    },
  },

  Count: {
    open: (root) => {
      const [[key, value]] = Object.entries(root);
      return Issue.count({
        where: { resolution_status_id: 1, [key]: value },
        raw: true,
      });
    },
    in_progress: (root) => {
      const [[key, value]] = Object.entries(root);
      return Issue.count({
        where: { resolution_status_id: 2, [key]: value },
        raw: true,
      });
    },
    resolved: (root) => {
      const [[key, value]] = Object.entries(root);
      return Issue.count({
        where: { resolution_status_id: 3, [key]: value },
        raw: true,
      });
    },
  },

  IssuesCountByBorough: {
    manhattan: () => {
      return { borough_id: 1 };
    },
    brooklyn: () => {
      return { borough_id: 2 };
    },
    queens: () => {
      return { borough_id: 3 };
    },
    bronx: () => {
      return { borough_id: 4 };
    },
    staten_island: () => {
      return { borough_id: 5 };
    },
  },

  IssuesCountByMonth: {
    January: () => {
      return {};
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
      Coordinates.create({ lat: args.lat, lng: args.lng })
        .then((result) => {
          return Issue.create(
            {
              title: args.title,
              description: args.description,
              user_id: args.user_id,
              issue_type_id: args.issue_type_id,
              borough_id: args.borough_id,
              photo_url: args.photo_url,
              coordinates_id: result.dataValues.id,
              resolution_status_id: 1,
            },
            { returning: true, raw: true }
          );
        })
        .catch((error) => console.log(error));
    },
    updateIssue: (parent, args, context) => {
      return Issue.update(args, {
        where: { id: args.id },
        raw: true,
      });
    },
    deleteIssue: (parent, args, context) => {
      return Issue.destroy({ where: { id: args.id } })
        .then((result) => Coordinates.destroy({ where: { id: result.dataValues.id } }))
        .catch((error) => console.log(error));
    },
  },
};

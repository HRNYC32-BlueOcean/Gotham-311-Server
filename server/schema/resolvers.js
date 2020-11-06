const { Op } = require('sequelize');
const {
  User,
  Issue,
  Issue_Type,
  Coordinates,
  Borough,
  Resolution_Status,
  Interaction,
} = require('../../db/models.js');

const countFunction = (root, id) => {
  if (root.period && root.borough_id) {
    const [[field, value], [_, date]] = Object.entries(root);
    return Issue.count({
      where: { resolution_status_id: id, [field]: value, create_date: { [Op.gte]: date } },
      raw: true,
    });
  }
  if (root.period) {
    let [[_, date]] = Object.entries(root);
    date = new Date(date);
    const day = 60 * 60 * 24 * 1000;
    const nextDate = new Date(date.getTime() + day);
    return Issue.count({
      where: {
        resolution_status_id: id,
        create_date: { [Op.between]: [date, nextDate] },
      },
      raw: true,
    });
  }
  const [[field, value]] = Object.entries(root);
  return Issue.count({
    where: { resolution_status_id: id, [field]: value },
    raw: true,
  });
};

const issuesOrder = (root, id) => {
  return Issue.findAll({
    where: {
      borough_id: id,
      [Op.or]: [{ resolution_status_id: 1 }, { resolution_status_id: 2 }],
    },
    order: [['upvotes_count', 'DESC']],
    limit: root.count,
    raw: true,
  });
};

module.exports.resolvers = {
  Query: {
    getUsers: (root, args, context) => {
      return User.findAll({ raw: true });
    },
    getUser: (root, args, context) => {
      return User.findAll({ where: args, raw: true });
    },
    getIssues: () => {
      return Issue.findAll({ raw: true });
    },
    getIssue: (root, args, context) => {
      return Issue.findAll({ where: args, raw: true });
    },
    getTypes: (root, args, context) => {
      return Type.findAll({ raw: true });
    },
    getType: (root, args, context) => {
      return Type.findAll({ where: args, raw: true });
    },
    getCoordinates: (root, args, context) => {
      return Coordinates.findAll({ raw: true });
    },
    getCoordinate: (root, args, context) => {
      return Coordinates.findAll({ where: args, raw: true });
    },
    getResolution_Statuses: (root, args, context) => {
      return Resolution_Status.findAll({ raw: true });
    },
    getResolution_Status: (root, args, context) => {
      return Resolution_Status.findAll({ where: args, raw: true });
    },
    getBoroughs: (root, args, context) => {
      return Borough.findAll({ raw: true });
    },
    getBorough: (root, args, context) => {
      return Borough.findAll({ where: args, raw: true });
    },
    topIssues: (root, args, context) => {
      return args;
    },
    issuesByBorough: (root, args, context) => {
      return args;
    },
    getSortedIssues: (root, args, context) => {
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
    getSortedUsers: (root, args, context) => {
      return User.findAll({
        order: [[args.by, args.order]],
        offset: args.offset || 0,
        limit: args.limit || 20,
      });
    },
    getIssuesByCoordinates: (root, args, context) => {
      return Coordinates.findAll({
        where: {
          lat: { [Op.between]: [args.underLat, args.upperLat] },
          lng: { [Op.between]: [args.underLng, args.upperLng] },
        },
        attributes: ['id'],
        raw: true,
      })
        .then((result) => {
          const ids = [];
          result.forEach((entry) => ids.push(entry.id));
          return Issue.findAll({
            where: { coordinates_id: { [Op.in]: ids } },
            raw: true,
          });
        })
        .catch((error) => console.log(error));
    },
    getIssuesByPeriod: (root, args, context) => {
      return args;
    },
    getInteraction: (root, args, context) => {
      return Interaction.findAll({ where: args, raw: true });
    },
    getInteractions: (root, args, context) => {
      return Interaction.findAll({ raw: true });
    },
  },

  User: {
    issues: (root) => {
      return Issue.findAll({ where: { user_id: root.id } });
    },
  },

  Issue: {
    type: (root) => {
      return Issue_Type.findAll({ where: { id: root.issue_type_id }, raw: true, plain: true });
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
      return issuesOrder(root, 1);
    },
    brooklyn: (root) => {
      return issuesOrder(root, 2);
    },
    queens: (root) => {
      return issuesOrder(root, 3);
    },
    bronx: (root) => {
      return issuesOrder(root, 4);
    },
    staten_island: (root) => {
      return issuesOrder(root, 5);
    },
  },

  Count: {
    open: (root) => {
      return countFunction(root, 1);
    },
    in_progress: (root) => {
      return countFunction(root, 2);
    },
    resolved: (root) => {
      return countFunction(root, 3);
    },
  },

  IssuesCountByBorough: {
    manhattan: (root) => {
      if (root.period) {
        const [[field, value]] = Object.entries(root);
        return { borough_id: 1, [field]: value };
      }
      return { borough_id: 1 };
    },
    brooklyn: (root) => {
      if (root.period) {
        const [[field, value]] = Object.entries(root);
        return { borough_id: 2, [field]: value };
      }
      return { borough_id: 2 };
    },
    queens: (root) => {
      if (root.period) {
        const [[field, value]] = Object.entries(root);
        return { borough_id: 3, [field]: value };
      }
      return { borough_id: 3 };
    },
    bronx: (root) => {
      if (root.period) {
        const [[field, value]] = Object.entries(root);
        return { borough_id: 4, [field]: value };
      }
      return { borough_id: 4 };
    },
    staten_island: (root) => {
      if (root.period) {
        const [[field, value]] = Object.entries(root);
        return { borough_id: 5, [field]: value };
      }
      return { borough_id: 5 };
    },
  },

  IssuesCountByPeriod: {
    oneDayAgo: (root) => {
      return { period: root.one };
    },
    twoDaysAgo: (root) => {
      return { period: root.two };
    },
    threeDaysAgo: (root) => {
      return { period: root.three };
    },
    fourDaysAgo: (root) => {
      return { period: root.four };
    },
    fiveDaysAgo: (root) => {
      return { period: root.five };
    },
    sixDaysAgo: (root) => {
      return { period: root.six };
    },
    sevenDaysAgo: (root) => {
      return { period: root.seven };
    },
  },

  Mutation: {
    createUser: (root, args, context) => {
      return User.create(args);
    },
    updateUser: (root, args, context) => {
      return User.update(args, {
        where: { id: args.id },
        raw: true,
      });
    },
    deleteUser: (root, args, context) => {
      return User.destroy({ where: { id: args.id } });
    },
    createIssue: (root, args, context) => {
      return Coordinates.create({ lat: args.lat, lng: args.lng })
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
    updateIssue: (root, args, context) => {
      return Issue.update(args, {
        where: { id: args.id },
        raw: true,
      });
    },
    deleteIssue: (root, args, context) => {
      return Issue.destroy({ where: { id: args.id } })
        .then((result) => Coordinates.destroy({ where: { id: result.dataValues.id } }))
        .catch((error) => console.log(error));
    },
    postInteraction: (root, args, context) => {
      return Coordinates.create({ lat: args.lat, lng: args.lng })
        .then((result) => {
          return Interaction.create(
            {
              user_id: args.user_id,
              issue_id: args.issue_id,
              interaction_type_id: args.interaction_type_id,
              coordinates_id: result.dataValues.id,
            },
            { returning: true, raw: true }
          );
        })
        .catch((error) => console.log(error));
    },
  },
};

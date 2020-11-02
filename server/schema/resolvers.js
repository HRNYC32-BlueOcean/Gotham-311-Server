const { User, Issue } = require('../../db/models.js');

module.exports.resolvers = {
  Query: {
    getUsers: () => {
      return User.findAll({ raw: true });
    },
    getUser: (parent, args, context) => {
      return User.findAll({ where: args, raw: true });
    },
  },
};

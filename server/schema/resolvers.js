const { User, Issue } = require('../../db/models.js');

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

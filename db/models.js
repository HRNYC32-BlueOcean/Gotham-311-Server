const { DataTypes } = require('sequelize');
const { db } = require('./index.js');

const User = db.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: 'users',
  }
);

User.sync()
  .then(() => console.log('User table synchronized'))
  .catch((error) => console.log('Something went wrong', error));

const Issue = db.define(
  'Issue',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING, allowNull: false },
    reported_count: { type: DataTypes.INTEGER, allowNull: false },
    task_owner: { type: DataTypes.STRING, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    lat: { type: DataTypes.FLOAT, allowNull: false },
    lng: { type: DataTypes.FLOAT, allowNull: false },
    upvotes_count: { type: DataTypes.INTEGER, allowNull: false },
    resolution_status: { type: DataTypes.INTEGER, allowNull: false },
    confirm_resolved_count: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    date_marked_in_progress: { type: DataTypes.DATE, allowNull: false },
    date_marked_resolved: { type: DataTypes.DATE, allowNull: false },
  },
  {
    tableName: 'issues',
  }
);

Issue.sync()
  .then(() => console.log('Issues table synchronized'))
  .catch((error) => console.log('Something went wrong', error));

module.exports.User = User;
module.exports.Issue = Issue;

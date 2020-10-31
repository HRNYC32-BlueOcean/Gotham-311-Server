const { DataTypes } = require('sequelize');
const { db } = require('./index.js');

const User = db.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
});

const Issue = db.define('Issue', {
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
});

module.exports.User = User;
module.exports.Issue = Issue;

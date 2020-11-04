const { DataTypes } = require('sequelize');
const { db } = require('./index.js');

const User = db.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    points: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    reported_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    banned: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.literal('CURRENT_TIMESTAMP(3)'),
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

const Type = db.define(
  'Type',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: 'types', timestamps: false }
);

const Borough = db.define(
  'Borough',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: 'borough', timestamps: false }
);

const Resolution_Status = db.define(
  'Resolution_Status',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: 'resolution_status', timestamps: false }
);

const Issue = db.define(
  'Issue',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    photo_url: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.literal('CURRENT_TIMESTAMP(3)'),
    },
    reported_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    upvotes_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    date_marked_in_progress: { type: DataTypes.DATE },
    date_marked_resolved: { type: DataTypes.DATE },
    confirm_resolved_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  {
    tableName: 'issues',
    timestamps: false,
  }
);

const Coordinates = db.define(
  'Coordinates',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    lat: { type: DataTypes.FLOAT, allowNull: false },
    lng: { type: DataTypes.FLOAT, allowNull: false },
  },
  { tableName: 'coordinates', timestamps: false }
);

Issue.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Issue, { foreignKey: 'user_id' });
Issue.belongsTo(Type, { foreignKey: 'type_id' });
Type.hasMany(Issue, { foreignKey: 'type_id' });
Issue.belongsTo(Borough, { foreignKey: 'borough_id' });
Borough.hasMany(Issue, { foreignKey: 'borough_id' });
Issue.belongsTo(Resolution_Status, { foreignKey: 'resolution_status_id' });
Resolution_Status.hasMany(Issue, { foreignKey: 'resolution_status_id' });
Issue.hasOne(Coordinates, { foreignKey: 'id' });

(async () => {
  await User.sync({ alter: true });
  await Type.sync({ alter: true });
  await Borough.sync({ alter: true });
  await Resolution_Status.sync({ alter: true });
  await Issue.sync({ alter: true });
  await Coordinates.sync({ alter: true });
  console.log('Tables syncronized');
})();

module.exports.User = User;
module.exports.Issue = Issue;
module.exports.Type = Type;
module.exports.Coordinates = Coordinates;
module.exports.Borough = Borough;
module.exports.Resolution_Status = Resolution_Status;

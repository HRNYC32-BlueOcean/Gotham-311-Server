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
    create_date: {
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

const Issue_Type = db.define(
  'Issue_Type',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: 'issue_types', timestamps: false }
);

const Borough = db.define(
  'Borough',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: 'boroughs', timestamps: false }
);

const Resolution_Status = db.define(
  'Resolution_Status',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
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
    confirm_not_resolved_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  {
    tableName: 'issues',
    timestamps: false,
  }
);

const Interaction_Type = db.define(
  'Interaction_type',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: 'interaction_types', timestamps: false }
);

const Interaction = db.define(
  'Interaction',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: db.literal('CURRENT_TIMESTAMP(3)'),
    },
  },
  { tableName: 'interactions', timestamps: false }
);

const Coordinates = db.define(
  'Coordinates',
  {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    lat: { type: DataTypes.FLOAT, allowNull: false },
    lng: { type: DataTypes.FLOAT, allowNull: false },
  },
  { tableName: 'coordinates', timestamps: false }
);

Issue.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Issue, { foreignKey: 'user_id' });

Issue.belongsTo(Issue_Type, { foreignKey: 'issue_type_id' });
Issue_Type.hasMany(Issue, { foreignKey: 'issue_type_id' });

Issue.belongsTo(Borough, { foreignKey: 'borough_id' });
Borough.hasMany(Issue, { foreignKey: 'borough_id' });

Issue.belongsTo(Resolution_Status, { foreignKey: 'resolution_status_id' });
Resolution_Status.hasMany(Issue, { foreignKey: 'resolution_status_id' });

Interaction.belongsTo(Interaction_Type, { foreignKey: 'interaction_type_id' });
Interaction_Type.hasMany(Interaction, { foreignKey: 'interaction_type_id' });

Interaction.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Interaction, { foreignKey: 'user_id' });

Interaction.belongsTo(Issue, { foreignKey: 'issue_id' });
Issue.hasMany(Interaction, { foreignKey: 'issue_id' });

Interaction.belongsTo(Coordinates, { foreignKey: 'coordinates_id' });
Coordinates.hasMany(Interaction, { foreignKey: 'coordinates_id' });

Issue.belongsTo(Coordinates, { foreignKey: 'coordinates_id' });
Coordinates.hasMany(Issue, { foreignKey: 'coordinates_id' });

(async () => {
  await User.sync({ alter: true });
  await Issue_Type.sync({ alter: true });
  await Borough.sync({ alter: true });
  await Resolution_Status.sync({ alter: true });
  await Coordinates.sync({ alter: true });
  await Interaction_Type.sync({ alter: true });
  await Issue.sync({ alter: true });
  await Interaction.sync({ alter: true });
  console.log('Tables syncronized');
})();

module.exports.User = User;
module.exports.Issue = Issue;
module.exports.Issue_Type = Issue_Type;
module.exports.Coordinates = Coordinates;
module.exports.Borough = Borough;
module.exports.Resolution_Status = Resolution_Status;
module.exports.Interaction = Interaction;
module.exports.Interaction_Type = Interaction_Type;

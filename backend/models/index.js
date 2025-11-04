const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const BonusHunt = require('./bonusHunt');
const Bonus = require('./bonus');

const models = {
  User: User.initModel(sequelize, Sequelize.DataTypes),
  BonusHunt: BonusHunt.initModel(sequelize, Sequelize.DataTypes),
  Bonus: Bonus.initModel(sequelize, Sequelize.DataTypes),
};

models.User.hasMany(models.BonusHunt, { foreignKey: 'userId', as: 'bonusHunts' });
models.BonusHunt.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

models.BonusHunt.hasMany(models.Bonus, { foreignKey: 'bonusHuntId', as: 'bonuses' });
models.Bonus.belongsTo(models.BonusHunt, { foreignKey: 'bonusHuntId', as: 'bonusHunt' });

module.exports = {
  sequelize,
  Sequelize,
  ...models,
};

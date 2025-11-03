const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const BonusHunt = require('./bonusHunt');
const Bono = require('./bono');

const models = {
  User: User.initModel(sequelize, Sequelize.DataTypes),
  BonusHunt: BonusHunt.initModel(sequelize, Sequelize.DataTypes),
  Bono: Bono.initModel(sequelize, Sequelize.DataTypes),
};

models.User.hasMany(models.BonusHunt, { foreignKey: 'usuario_id', as: 'bonusHunts' });
models.BonusHunt.belongsTo(models.User, { foreignKey: 'usuario_id', as: 'usuario' });

models.BonusHunt.hasMany(models.Bono, { foreignKey: 'bonus_hunt_id', as: 'bonos' });
models.Bono.belongsTo(models.BonusHunt, { foreignKey: 'bonus_hunt_id', as: 'bonusHunt' });

module.exports = {
  sequelize,
  Sequelize,
  ...models,
};

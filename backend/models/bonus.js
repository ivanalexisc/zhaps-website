const { Model } = require('sequelize');

class Bonus extends Model {
  static initModel(sequelize, DataTypes) {
    Bonus.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        bonusHuntId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        slotName: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        bet: {
          type: DataTypes.DECIMAL(12,2),
          allowNull: false,
          defaultValue: 0,
        },
        multiplier: {
          type: DataTypes.DECIMAL(12,2),
          allowNull: true,
        },
        win: {
          type: DataTypes.DECIMAL(12,2),
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM('Pending', 'Opened', 'Completed'),
          allowNull: false,
          defaultValue: 'Pending',
        },
      },
      {
        sequelize,
        modelName: 'Bonus',
        tableName: 'bonuses',
        timestamps: true,
      }
    );

    return Bonus;
  }
}

module.exports = Bonus;
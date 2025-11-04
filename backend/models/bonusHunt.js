const { Model } = require('sequelize');

class BonusHunt extends Model {
  static initModel(sequelize, DataTypes) {
    BonusHunt.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        startBalance: {
          type: DataTypes.DECIMAL(12,2),
          allowNull: false,
        },
        isFinished: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'BonusHunt',
        tableName: 'bonus_hunts',
        timestamps: true,
      }
    );

    return BonusHunt;
  }
}

module.exports = BonusHunt;

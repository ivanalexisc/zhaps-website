const { Model } = require('sequelize');

class BonusHunt extends Model {
  static initModel(sequelize, DataTypes) {
    BonusHunt.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        fecha_inicio: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        fecha_fin: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        monto_inicial: {
          type: DataTypes.DECIMAL(12,2),
          allowNull: false,
        },
        monto_final: {
          type: DataTypes.DECIMAL(12,2),
          allowNull: true,
        },
        estado: {
          type: DataTypes.ENUM('activo','finalizado','cancelado'),
          allowNull: false,
          defaultValue: 'activo',
        },
        usuario_id: {
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

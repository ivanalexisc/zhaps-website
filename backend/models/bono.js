const { Model } = require('sequelize');

class Bono extends Model {
  static initModel(sequelize, DataTypes) {
    Bono.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        bonus_hunt_id: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        juego: {
          type: DataTypes.STRING(150),
          allowNull: false,
        },
        proveedor: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        apuesta: {
          type: DataTypes.DECIMAL(12,2),
          allowNull: false,
          defaultValue: 0,
        },
        ganancia: {
          type: DataTypes.DECIMAL(12,2),
          allowNull: true,
        },
        abierto: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
        modelName: 'Bono',
        tableName: 'bonos',
        timestamps: true,
      }
    );

    return Bono;
  }
}

module.exports = Bono;

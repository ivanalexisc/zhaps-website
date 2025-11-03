
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static initModel(sequelize, DataTypes) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING(120),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
      }
    );

    // Hook to hash password
    User.beforeCreate(async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    });

    User.prototype.comparePassword = async function (candidate) {
      return bcrypt.compare(candidate, this.password);
    };

    return User;
  }
}

module.exports = User;

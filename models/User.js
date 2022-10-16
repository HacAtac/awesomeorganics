const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// create our User model
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.pwd);
  }
}

// create fields/columns for User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {},
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {},
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },

    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },

  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.pwd = await bcrypt.hash(newUserData.pwd, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.pwd = await bcrypt.hash(updatedUserData.pwd, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "User",
  }
);

module.exports = User;

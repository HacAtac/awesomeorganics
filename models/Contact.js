const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Contact extends Model {}

Contact.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
     },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
     },
     message: {
       type: DataTypes.STRING,
       allowNull: false,
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Contact;
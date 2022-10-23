const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Dynamic extends Model {}

Dynamic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    heroImage: {
      type: DataTypes.STRING,
    },

    // ImageArray: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Dynamic;

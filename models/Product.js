const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Products extends Model {}

Products.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {},
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },

    // img: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   validate: {},
    // },
  },
  {
    sequelize,
  }
);

module.exports = Products;

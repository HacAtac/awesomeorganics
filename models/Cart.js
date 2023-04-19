const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Cart extends Model {}

Cart.init(
  {
    // Define the primary key for the Cart model (optional)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the foreign key UserId to associate the cart item with a user
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    // Define the foreign key ProductId to associate the cart item with a product
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    },
    // Define the quantity of the product in the cart
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "Cart", // Define the model name (optional)
    indexes: [
      {
        unique: true,
        fields: ["UserId", "ProductId"], // Add a unique constraint on the combination of UserId and ProductId
      },
    ],
  }
);

module.exports = Cart;

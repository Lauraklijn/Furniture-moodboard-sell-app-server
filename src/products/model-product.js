const Sequelize = require("sequelize");
const db = require("../../db");
const { User } = require("../user/model-user");

const Product = db.define("product", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Product.belongsTo(User);
User.hasMany(Product);

module.exports = Product;

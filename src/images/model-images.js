const Sequelize = require("sequelize");
const db = require("../../db");

const Image = db.define("image", {
  image: {
    type: Sequelize.STRING
  }
});

//Image.belongsTo(Moodboard);

module.exports = Image;

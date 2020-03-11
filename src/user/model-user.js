const Sequelize = require("sequelize");
const db = require("../../db");

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// ------- Model for userProfile
const UserProfile = db.define("userprofile", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING
  },
  discription: {
    type: Sequelize.STRING
  }
});

UserProfile.belongsTo(User);
User.hasOne(UserProfile);

module.exports = { User, UserProfile };

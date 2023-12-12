const Sequelize = require('sequelize')
const sequelize = require('../util.db')

const Archieve = sequelize.define("archieveMsg", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  timestamp: {
    type: Sequelize.DATE,
  },
});

module.exports = Archieve;
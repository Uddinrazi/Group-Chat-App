const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const Chat = sequelize.define('chat', {
    
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
})

module.exports = Chat;
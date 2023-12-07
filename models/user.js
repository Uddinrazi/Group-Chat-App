const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const User = sequelize.define('user', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.STRING, 
        allowNull: false,
        
    },
    
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
   
})

module.exports = User;
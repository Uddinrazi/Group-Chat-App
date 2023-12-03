const Sequelize = require('sequelize')
const sequelize = require('../util/db')
const User = require('../models/user')
const Chat = require('../models/chat')

const Group = sequelize.define('group',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const User_group = sequelize.define('user_group', {

})



const User_Admin = sequelize.define('user_admin', {

})





module.exports = {Group, User_Admin,User_group};


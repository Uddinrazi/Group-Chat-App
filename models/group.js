const Sequelize = require('sequelize')
const sequelize = require('../util/db')
const User = require('../models/user')

const Group = sequelize.define('group',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const User_group = sequelize.define('user_group', {

})

User.belongsToMany(Group, {through: User_group})
Group.belongsToMany(User, {through: User_group})
User.hasMany(User_group)
User_group.belongsTo(User)
Group.hasMany(User_group)
User_group.belongsTo(Group)

module.exports = Group;
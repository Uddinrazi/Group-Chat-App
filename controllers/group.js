const Chat = require('../models/chat')
const Group = require('../models/group')
const User = require('../models/user')

module.exports.getUserList = async(req, res) => {
    try{
        
        const users = await User.findAll({
            include: Group
        }) 
        
        res.status(200).json({user: users, message: 'list of users found'})
    }
    catch(err){
        console.log(err)
    }

  }
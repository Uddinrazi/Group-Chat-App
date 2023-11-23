const jwt = require('jsonwebtoken')
const User = require('../models/user')


const authenticate = async(req, res, next) => {
    try{
        const token = req.header('Authorization')
        
        const users = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log(users,'usersssssssss')
        let user = await User.findByPk(users.userid)
        req.user = user;

        next();

    }catch(err){
        console.log(err)
    }
}

module.exports = authenticate;
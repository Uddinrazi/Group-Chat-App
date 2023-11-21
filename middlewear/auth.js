const jwt = require('jsonwebtoken')
const User = require('../models/user')


module.expert.authenticate = async(req, res, next) => {
    try{
        const token = req.header('Authorization')
        
        const users = jwt.verify(token, process.env.TOKEN_SECRET)

        let user = await User.findByPk

    }catch(err){
        console.log(err)
    }
}
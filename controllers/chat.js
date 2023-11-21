const Chat = require('../models/chat') 

module.exports.postChats = async(req, res, next) => {
    try{
        const {user_msg} = req.body
        console.log(req.body,'hhhhhhhhhh')
        let response = await Chat.create({text: user_msg})
        console.log(response)
        res.status(201).json({success: true, message: ' msg saved'})
    }
  catch(err){
    console.log(err)
    res.status(500).json({err:err})
  }
}
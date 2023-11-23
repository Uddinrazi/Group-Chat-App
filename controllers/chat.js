const Chat = require('../models/chat') 
const User = require('../models/user')
 

module.exports.postChats = async(req, res, next) => {
    try{
      
        const {user_msg} = req.body
        console.log(req.body,'hhhhhhhhhh')
        let data = await Chat.create({text: user_msg, userId: req.user.id})
        
        res.status(201).json({data:data,success: true, message: ' msg saved'})
    }
  catch(err){
    console.log(err)
    res.status(500).json({err:err, success:false})
  }
}

module.exports.getChats = async(req, res) => {
  try{
    const userId = req.user.id
  // let msgsLimit = + req.query.limit || 5;
    
    let allData = await Chat.findAll({where: {userId: userId}})
    
    res.status(200).json({allData: allData, success: true, message: 'Got all data' })
    
  }catch(err) {
    console.log(err)
    res.status(400).json({err:err, success: false})
  }
}
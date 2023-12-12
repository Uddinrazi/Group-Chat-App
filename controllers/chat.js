const Chat = require('../models/chat') 
const {Group,User_Admin,User_group} = require('../models/group')
const User = require('../models/user')
const {Op} = require('sequelize')


module.exports.uploadMedia = async (req, res) => {
  try {
    const mediaUrl = `${req.file.filename}`;
    const message = await Chat.create({ text: req.body.text, mediaUrl ,gropId: req.body.groupId})
    
    res.status(200).json({message, mediaUrl, message: ' files saved'})
  }
  catch (err) {
    
    res.status(500).json({err:err})
  }
}


module.exports.postGroupChats = async (req, res) => {
  try {
   
    const { grpmsg , groupId} = req.body

    let data = await Chat.create({
      text: grpmsg, userId: req.user.id,
      groupId
    })
    console.log(data,'line 3333333444444444')
    res.status(201).json({data:data,groupId: groupId,message:'group chat saved '})
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ err: err, success: false })
  }
}






module.exports.getGroupOnMainPage = async(req, res) => {
  try {
   
    const groupId = await User_group.findAll({
      where:{userId : req.user.id}
    })

    const results = []
   groupId.forEach((ele) => {
      results.push(ele.groupId)
      console.log(ele.groupId,'line 50')
    })
    
   
     // let response = await Group.findOne({ where: { id: results } }) //groupId we will get from frontend
    const result1 = await req.user.getGroups({
        attributes : ['id','name','createdAt']
      })
    
    
    res.status(200).json({ results, result1,  success: true, message: 'successfull found data' })
  
  }
  
  catch(err){
      console.log(err)
  }
}


module.exports.getGroupChats = async (req, res) => {
  try {
    const sevenDaysBefore = new Date(
      new Date().setDate(new Date().getDate() - 7)
    );
   
   
    let groupId = req.params.id
    console.log(groupId)
    let response = await Chat.findAll({
      where: {
        groupId: groupId,
        createdAt: {
          [Op.gte]: sevenDaysBefore,
        },
      },
    });
    console.log(response,'ressssssssss')
    res.status(200).json({response, groupId, success:true,message: 'group chats recieved'})
  }
  catch (err) {
    console.log(err)
  }
}
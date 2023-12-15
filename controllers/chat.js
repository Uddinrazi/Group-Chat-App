const Chat = require('../models/chat') 
const {Group,User_Admin,User_group} = require('../models/group')
const User = require('../models/user')
const {Op} = require('sequelize')





module.exports.postGroupChats = async (req, res) => {
  try {
   
    const { grpmsg , groupId} = req.body
    console.log(groupId,'line 1333333333333')
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
    
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ['name']
    })
    const result1 = await req.user.getGroups({
        attributes : ['id','name','createdAt']
      })
    
    
    res
      .status(200)
      .json({ user,result1, success: true, message: "successfull found data" });
  
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
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    console.log(response,'ressssssssss')
    res.status(200).json({response, groupId, success:true,message: 'group chats recieved'})
  }
  catch (err) {
    console.log(err)
  }
}
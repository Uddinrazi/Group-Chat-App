const Chat = require('../models/chat') 
const {Group,User_Admin,User_group} = require('../models/group')
const User = require('../models/user')
 
module.exports.postChats = async(req, res, next) => {
    try{
    
        const {user_msg} = req.body

       // console.log(groupId,'aaaaaaatttttttt')
       let data = await Chat.create({text: user_msg, userId: req.user.id,
      
      })
        
       res.status(201).json({data:data,text: data.text,userId: data.userId ,success: true, message: ' msg saved'})
    }
  catch(err){
    console.log(err)
    res.status(500).json({err:err, success:false})
  }
}




module.exports.postGroupChats = async (req, res) => {
  try {
   
    const { grpmsg , groupId} = req.body

    let data = await Chat.create({
      text: grpmsg, userId: req.user.id,
      groupId
    })
    res.status(201).json({data,groupId: groupId,message:'group chat saved '})
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ err: err, success: false })
  }
}



module.exports.getChats = async(req, res) => {
  try{
    const userId = req.user.id
  // let msgsLimit = + req.query.limit || 5;
    
    let allData = await Chat.findAll()
    
    res.status(200).json({allData: allData, success: true, message: 'Got all data' })
    
  }catch(err) {
    console.log(err)
    res.status(400).json({err:err, success: false})
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
    //const result2 = await req.user.getAdmins({
      //  attributes: ['id','name']
     // })
     // const result3 = await response.getChats()   
     
    let response1 = await Group.findByPk({ where: { id: results } ,
  
    }) 
    const admins = response1.getAdmins()
    
    res.status(200).json({ results, result1, admins, success: true, message: 'successfull found data' })
  
  }
  
  catch(err){
      console.log(err)
  }
}


module.exports.getGroupChats = async (req, res) => {
  try {
    let groupId = req.params.id
    console.log(groupId)
    let response = await Chat.findAll({ where: { groupId: groupId } })
    console.log(response,'ressssssssss')
    res.status(200).json({response, success:true,message: 'group chats recieved'})
  }
  catch (err) {
    console.log(err)
  }
}
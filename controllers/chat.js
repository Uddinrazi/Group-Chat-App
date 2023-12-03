const Chat = require('../models/chat') 
const {Group,User_Admin,User_group} = require('../models/group')
const User = require('../models/user')
 

module.exports.postChats = async(req, res, next) => {
    try{
    
        const {user_msg} = req.body

        console.log(groupId,'aaaaaaatttttttt')
       let data = await Chat.create({text: user_msg, userId: req.user.id,
      include: Group
      })
        
       res.status(201).json({data:data,text: data.text,userId: data.userId ,success: true, message: ' msg saved'})
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

   /*  let user = await User.findByPk(userid, {
        include:[{
          model: Group,
          attributes: ['id','name']
        }]
        
      })  
      const result = await user.getChats() */
    let response = await Group.findOne({ where: { id: results }}) //groupId we will get from frontend
     const result = await response.getUsers()
    const result2 = await response.getAdmins()
     const result3 = await response.getChats() 
    
      
    res.status(200).json({ response, result, result2,result3,success: true,message: 'successfull found data'})   
    
   
  }
  
  catch(err){
      console.log(err)
  }
}
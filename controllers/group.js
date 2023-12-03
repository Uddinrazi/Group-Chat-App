const Chat = require('../models/chat')
const {User_Admin,User_group, Group}  = require('../models/group')
const User = require('../models/user')


module.exports.getUserList = async(req, res) => {
    try{
        
        const users = await User.findAll() 
        
        res.status(200).json({user: users, message: 'list of users found'})
    }
    catch(err){
        console.log(err)
    }

  }

  module.exports.postGroupInfo = async(req,res,) => {
    try{
      const { id,name, userId, adminId } = req.body
     
        console.log(id)
        let response = await Group.create({id:id,name:name})
       
        const result = await response.addUsers(userId)
      const result1 = await response.addAdmins(adminId)
      
       
      console.log(result1,'resssssssss' )
      res.status(201).json({id:id,name:name,message:'grp details saved'})
    }catch(err){
        console.log(err)
    }
  }

  

//show group on frontent 
  // let response = await Group.findOne({where:{id: groupId}}) //groupId we will get from frontend
 // const result = await response.getUsers()
  //const result2 = await response.getAdmins()
 // const result3 = await response.getChats() 
 
 
 //---admin super power line no 
 
  // let response = await Group.findOne({where:{id: groupId}}) //groupId we will get from frontend
  //const result1 = await response.addAdmins(adminId) check box method arry.push

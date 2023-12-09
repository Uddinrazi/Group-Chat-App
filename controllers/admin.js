const { Group, User_Admin, User_group } = require("../models/group");
const User = require("../models/user");
const { Op } = require('sequelize')

module.exports.getAdmins = async (req, res) => {
  try {
    const groupId = req.params.id;
    let response1 = await Group.findOne({ where: { id: groupId } });
      const admins = await response1.getAdmins({
        attributes: ['id','name']
    });
    const Users = await response1.getUsers();

    //console.log(response1, "line 133333333333");
    //console.log(result, "line 4444444444444");
    //console.log(result1, "line 55555555555");

    // let result = await response1.getAdmins()
    res.status(200).json({
      response1,
      admins,
      Users,
      success: true,
      message: "received admins",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

module.exports.getAllUsers = async (req, res) => {
    const groupId = req.params.id
    
  //console.log(groupId, "line 28888888888");
    try {
      let users = await User.findAll({
          attributes: ['id','name','email']
        })
          
            // Fetch user IDs belonging to the group to be excluded
        let   groupMembers = await  User_group.findAll({
              where: {
                groupId: groupId,
              },
              attributes: ["userId"], // Select only the UserId column
            })
              const userIdsToExclude = groupMembers.map(
                (member) => member.userId
              );

              // Use Array.prototype.filter to exclude users
              const filteredUsers = users.filter(
                (user) => !userIdsToExclude.includes(user.id)
              );
      
              res
                .status(200)
                .json({
                  data: filteredUsers,
                  success: true,
                  message: "All users found",
                });
            
            
          
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

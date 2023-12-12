const { Group, User_Admin, User_group } = require("../models/group");
const User = require("../models/user");
const { Op } = require("sequelize");

module.exports.getAdmins = async (req, res) => {
  try {
    const groupId = req.params.id;
    let response1 = await Group.findOne({ where: { id: groupId } });
    const admins = await response1.getAdmins({
      //get all admins related to one grp

      attributes: ["id", "name"],
    });
    const Users = await response1.getUsers();  //get all users related to one grp

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


//get all User excluding the user of current group to add new users to group

module.exports.getAllUsers = async (req, res) => {
  const groupId = req.params.id;

  //console.log(groupId, "line 28888888888");
  try {
    let users = await User.findAll({
      attributes: ["id", "name", "email"],
    });

    // Fetch user IDs belonging to the group to be excluded
    let groupMembers = await User_group.findAll({
      where: {
        groupId: groupId,
       // order: [ 'createdAt', 'ASC']
      },
      attributes: ["userId"], // Select only the UserId column
    });
    const userIdsToExclude = groupMembers.map((member) => member.userId);

    // Use Array.prototype.filter to exclude users
    const filteredUsers = users.filter(
      (user) => !userIdsToExclude.includes(user.id)
    );

    res.status(200).json({
      data: filteredUsers,
      success: true,
      message: "All users found",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

module.exports.addNewUserToExistingGroup = async (req, res) => {
  try {
    const { userId } = req.body;
    const groupId = req.params.id;
    let response = await Group.findOne({ where: { id: groupId } });
    const result = await response.addUser(userId);
    res.status(200).json({ response, result, message: "new users added" });
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteGroupUsers = async (req, res) => {
  // const { groupId, userId } = req.params;
  
  const response = await Group.findByPk(req.params.id1);
  const result = await response.removeUser(req.params.id2);

  res
    .status(200)
    .json({ message: "User removed from group", result, response });
};

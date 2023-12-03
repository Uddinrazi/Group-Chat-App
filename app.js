const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')

require("dotenv").config();
const sequelize = require("./util/db");

const app = express()

app.use(express.json())

const signupRoutes = require("./routes/user");
const chatRoutes = require('./routes/chat')
const grpRoutes = require('./routes/group')

const User = require('./models/user')
const Chat = require('./models/chat')
const {Group, User_Admin,User_group} = require('./models/group')

app.use(express.static(path.join(__dirname,"/public")))

app.use(cors());
app.use(bodyParser.json())


app.use("/user", signupRoutes);
app.use("/msg", chatRoutes);
app.use('/grp', grpRoutes)


User.hasMany(Chat)
Chat.belongsTo(User)

User.belongsToMany(Group, { through: User_group})
Group.belongsToMany(User, {through: User_group})
User.hasMany(User_group)
User_group.belongsTo(User)
Group.hasMany(User_group)
User_group.belongsTo(Group)

Group.hasMany(Chat)
Chat.belongsTo(Group)

User.belongsToMany(Group, { through: User_Admin})
Group.belongsToMany(User, {as:'admins',through: User_Admin})

sequelize
  .sync({ force: false })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

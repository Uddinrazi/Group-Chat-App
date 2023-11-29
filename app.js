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
const Group = require('./models/group')

app.use(express.static(path.join(__dirname,"/public")))

app.use(cors());
app.use(bodyParser.json())


app.use("/user", signupRoutes);
app.use("/msg", chatRoutes);
app.use('/grp', grpRoutes)


User.hasMany(Chat)
Chat.belongsTo(User)

Group.hasMany(Chat)
Chat.belongsTo(Group)

sequelize
  .sync({ force: false })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

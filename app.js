const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')
const multer = require('multer')
const app = express();

require("dotenv").config();
const sequelize = require("./util/db");
const io = require('socket.io')(app.listen(3000), {
  cors: true
})


app.use(express.json())

const signupRoutes = require("./routes/user");
const chatRoutes = require('./routes/chat')
const grpRoutes = require('./routes/group')
const adminRoutes = require('./routes/admin')

const User = require('./models/user')
const Chat = require('./models/chat')
const { Group, User_Admin, User_group } = require('./models/group')

app.use(express.static(path.join(__dirname, "/public")))

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files')
  },
  filename: (req, res, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

app.use('/upload',chatRoutes)

app.use("/user", signupRoutes);
app.use("/msg", chatRoutes);
app.use('/grp', grpRoutes)
app.use('/admin', adminRoutes)


User.hasMany(Chat)
Chat.belongsTo(User)

User.belongsToMany(Group, { through: User_group })
Group.belongsToMany(User, { through: User_group })
User.hasMany(User_group)
User_group.belongsTo(User)
Group.hasMany(User_group)
User_group.belongsTo(Group)

Group.hasMany(Chat)
Chat.belongsTo(Group)

User.belongsToMany(Group, {through: User_Admin, timestamps:false})
Group.belongsToMany(User, { as: 'admins', through: User_Admin, timestamps: false })

sequelize
  .sync({ force: false })
  .then((result) => {
   
  })
  .catch((err) => {
    console.log(err);
  });



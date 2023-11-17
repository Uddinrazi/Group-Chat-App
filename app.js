const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')

require("dotenv").config();
const sequelize = require("./util/db");

const app = express()

app.use(express.json())

const signupRoutes = require("./routes/user");

app.use(express.static(path.join(__dirname,"/public")))

app.use(cors());
app.use(bodyParser.json())

app.use("/user", signupRoutes);

sequelize
  .sync({ force: false })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

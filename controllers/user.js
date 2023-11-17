const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function isStringInvalid(string) {
    if (string == undefined || string.length === 0) 
    return true;
    else 
    return false;
  }

  module.exports.postUserInfo = async(req, res, next) => {
    try{
        const { name, email, phone, password } = req.body;
        if(isStringInvalid(name) || isStringInvalid(email) || 
        isStringInvalid(phone) ||
        isStringInvalid(password) ){

        return res.status(400).json({err: 'Bad credentials something is missing'})
        }
        bcrypt.hash(password, 10, async (err, hash) => {
           await User.create({ name, email, phone, password: hash })
            res.status(201).json({ message: "New user craeted" })
        })
        let response = await User.findOne({where: {email: email}})
        if(User.length > 0 ){
            res.status(226).json(response,{message: 'Email id already in use'})
        }
    }catch(err){
        console.log(err)
    }
  }


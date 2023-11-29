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
            if(err){
                console.log(err)
                res.status(404).json(err,{ message: 'something went wrong'})
            }
            let user = await User.findOne({where: {email: email}})
            console.log(user, 'uuuuuuusssssss')
        if(user){
           return res.status(226).json({user:user, message: 'Email id already in use'})
            }
           await User.create({ name, email, phone, password: hash })
            res.status(201).json({ message: "New user craeted" })
        })
        
    }catch(err){
        console.log(err)
    }
  }

function generateAccessToken(id,name) {
  return jwt.sign(
    {userid: id,name: name},
    process.env.TOKEN_SECRET

  )
}

  module.exports.postLoginInfo = async (req, res) => {
    try{
    const {email, password} = req.body;

    if(isStringInvalid(email) || isStringInvalid(password)){
      res.status(4004).json({message: 'something is missing'})
    }
    const user = await User.findOne({where: {email: email}})
    if(user){
      bcrypt.compare(password, user.password, (err, result) => {
        if(err){
          throw new Error(err)
        }
        if(result === true){
          res.status(200).json({success: true, meaasge: ' Login Successful', 
          token : generateAccessToken(
            user.id,
            user.name
          )
        })
        }
        else{
          return res.status(400).json({success: false, message:'Incorrecr Password'})
        }
      })
    }
      else {
        res.status(404).json({message: 'user does not exist'}) 
      }
    
  }catch(err){
    console.log(err)
  }

  }


 

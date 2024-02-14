const User = require('../models/User')
const jwt = require("jsonwebtoken")
const jwt_secret="IHADALWAYSBEENTHEBEST";

const fetchuser =async(req,res,next)=>{
    try{
    let token = req.header('user')
    if(!token){
        return res.status(201).send("not allowed")
    }
    let user= jwt.verify(token,jwt_secret)
   user= await User.findById(user.id)
   if(!user){
    return res.status(201).send("not allowed")
   }
   req.user=user;
   next()
}
catch(errors){
    console.log(errors)
    return res.status(500).send("internal error")
}
}

module.exports =fetchuser;
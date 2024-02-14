const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const jwt_secret="IHADALWAYSBEENTHEBEST";
const User = require("../models/User")
const bcrypt = require("bcrypt")
const fetchuser = require("../middleware/fetchuser")


// registring a new user
router.post("/register",async (req,res)=>{
    const {email,number,password,first,last,address}=req.body;
  try{
    const r1 = await User.findOne({email:email});
    const r2= await User.findOne({number:number});
  if(r1 || r2){
   return res.send({result:"user already exist"})
  }
  else{
    let salt =await bcrypt.genSalt(10)
    let sec_password =await bcrypt.hash(password,salt)
  const user = new User({email,first,address,last,number,password:sec_password});
  let result = await user.save();
  let payload ={
    id:result._id
  }
  result = jwt.sign(payload,jwt_secret)
  res.json({user:result})
  }
}
catch(errors){
    console.log(errors)
    res.status(500).send("some internal error appeared")
}
})


// login a user 
router.post("/login",async (req,res)=>{
    let result = await User.findOne({email:req.body.email});
    if(result){
        let matchPassword =await bcrypt.compare(req.body.password,result.password)
     if(matchPassword){
        let payload ={
            id:result._id
          }
          result = jwt.sign(payload,jwt_secret)
          res.json({user:result})
     }
     else{
      return res.send({result:"please fill correct details"})
     }
    }
    else{
       return res.send({result:"please fill correct details"})
    }
})

router.get("/profile",fetchuser,(req,res)=>{
try{
return res.send(req.user)
}
catch(errors){
  return  res.status(500).send("internal error")
}
})



// updata profile
router.put("/update",fetchuser,async(req,res)=>{
  try{
  let {first,last,address,password,email,number}=req.body;
  let u1= await User.findOne({email})
  let u2= await User.findOne({number})
  let userId = req.user._id;
  if(u1){
    if(u1._id.toString() !== userId.toString()){
      return res.send({result:"user exist with same email"})
    }
  }
  if(u2){
    if(u2._id.toString() !== userId.toString()){
      return res.send({result:"user exist with same number"})
    }
  }
  let salt =await bcrypt.genSalt(10);
  let sec_password=await bcrypt.hash(password,salt)
  let user =await User.updateOne({_id:userId},{"$set":{email,first,last,password:sec_password,number,address}})
  
  return res.json({result:"updated"})
}
catch(errors){
  console.log(errors);
  res.status(500).send({error:"internal error"})
}
})


module.exports = router;
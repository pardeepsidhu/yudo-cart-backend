const express =require("express")
const router = express.Router()
const Product = require("../models/Product")
const Cart = require("../models/Cart")
const User = require("../models/User")
const Review = require("../models/Review")
const fetchuser = require("../middleware/fetchuser")

// add a new reviiew
router.post("/addreview/:id",fetchuser,async(req,res)=>{
try{
    let isAdded = await Review.findOne({user:req.user.email,product:req.params.id})
    if(isAdded){
      res.send({result:"avalible"})
    }
    else{
    let review = new Review({user:req.user.email,product:req.params.id,body:req.body.body,rate:req.body.rate});
    let result = await review.save()
    res.send(result)
    }
   }
   catch(errors){
    console.log(errors)
    res.status(500).send("some internal error appeared")
}
  })


  // find all reviews
  router.get("/findreview/:id",async(req,res)=>{
try{
    let reviews = await Review.find({product:req.params.id});
    res.send(reviews)
    }
catch(errors){
        console.log(errors)
        res.status(500).send("some internal error appeared")
    }
  });
  
module.exports = router;
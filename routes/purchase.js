const express = require("express")
const router = express.Router()
const Purchase = require("../models/Purchase")
const fetchuser = require("../middleware/fetchuser")
const Product = require("../models/Product")
const User = require("../models/User")

// purchase a phone
router.post("/purchase/:id",fetchuser,async(req,res)=>{
    try{
        let purchase = new Purchase({user:req.user.email,product:req.params.id,number:req.user.number,number2:req.body.number2,address:req.user.address,address2:req.body.address2});
        let result = await purchase.save();
        res.send(result)
    }
    catch(errors){
        console.log(errors)
        res.status(500).send("some internal error appeared")
    }
})


// get all purchased phones
router.get("/getpurchases",fetchuser,async(req,res)=>{
try{
    let result = await Purchase.find({user:req.user.email});
    let data=[];
    if(result.length>0){
    result.map(async(item,index)=>{
     let tempProduct = await Product.findOne({_id:item.product})
     let temp = {
      _id:tempProduct._id,
      name:tempProduct.company+" "+tempProduct.name,
      date:item.date,
      price:tempProduct.price,
      img:tempProduct.img
     }
  data.unshift(temp)
   if(index === result.length-1){
    res.send(data)
   }
    })
  }
  else{
    res.send({result:"no data"})
  }
}
catch(errors){
    console.log(errors)
    res.status(500).send("some internal error appeared")
}
  })
  

  // cancel order

router.delete("/deletepurchases/:id",fetchuser,async(req,res)=>{
    try{
    let result = await Purchase.deleteOne({product:req.params.id,user:req.user.email,date:req.body.date})
    res.send(result)
}
catch(errors){
    console.log(errors)
    res.status(500).send("some internal error appeared")
}
  })
module.exports = router;
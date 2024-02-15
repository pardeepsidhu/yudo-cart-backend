const express = require("express")
const router = express.Router()
const Purchase = require("../models/Purchase")
const fetchuser = require("../middleware/fetchuser")
const Product = require("../models/Product")
const User = require("../models/User")
const Cart = require("../models/Cart")

// add a product to cart
router.post("/addtocart",fetchuser,async(req,res)=>{
   try {
    let result = await Cart.findOne({user:req.user._id})
    if(!result){
      let cart = new Cart({user:req.user._id,products:req.body.newProduct})
      result = await cart.save();
    }
    let x = result.products;
    if(x.indexOf(req.body.newProduct)!==-1){
     x=  x.remove(req.body.newProduct)
     result = await Cart.updateOne({user:req.user._id},{
      $set:{products :x}
    })
      res.send({result:"removed from cart"});
    }
    else{
    x.unshift(req.body.newProduct)
    result = await Cart.updateOne({user:req.user._id},{
      $set:{products :x}
    })
    res.send({result:"added to cart"});
  }
  }
  catch(errors){
    console.log(errors)
    res.status(500).send("some internal error appeared")
}
  })

  // checK if product avalible in cart
  router.post("/cart",fetchuser,async(req,res)=>{
    try{
    let result = await Cart.findOne({user:req.user._id});
    if(!result){
      res.send({result:"not in cart"})
    }
    else{
         let x = result.products;
         if(x.indexOf(req.body.thisProduct)!== -1){
          res.send({result:"exist"})
         }
         else{
          res.send({result:"not in cart"})
         }
    }
  }
  catch(errors){
    console.log(errors)
    res.status(500).send("some internal error appeared")
}
  })
  

// get all cart products

router.get("/cart",fetchuser,async(req,res)=>{
  let result = await Cart.findOne({user:req.user._id});
   if(!result){
    return res.send({result:"empty cart"})
  }
  let x = result.products;
  let y =[];
  let z;
  if(x.length >0){
    x.map(async(item,index)=>{     
    z = await Product.findOne({_id:item});
    y.unshift(z)
    if(index === x.length-1){
       res.send({result:y})
    }
    })  
  }
  else{
    res.send({result:"empty cart"})
  }
})

module.exports=router;

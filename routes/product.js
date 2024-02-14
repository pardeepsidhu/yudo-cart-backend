const express =require("express")
const router=express.Router()
const Product = require("../models/Product")
const Recent = require("../models/Recent")
const fetchuser = require("../middleware/fetchuser")

// getting all products
router.get("/getproducts",async(req,res)=>{
    try{
        let result = await Product.find();
        res.send(result) }
        catch{
        res.send({result:"waiting"}) }
})

// getting one product
router.get("/getproduct/:id",async(req,res)=>{
    try{
    let result=await Product.findOne({_id:req.params.id});
    return res.send(result)
    }
    catch(errors){
        console.log(errors)
      return  res.status(500).send({error:"internal error"})
    }
  })

  // add rouduct to recent

router.post('/addrecent/:id',fetchuser,async(req,res)=>{
   try{
    let recent = new Recent({user:req.user.email,product:req.params.id,price:req.body.price,name:req.body.name,img:req.body.img})
    let recents = await Recent.find({user:req.user.email});
    if(recents.length >14){
      let del = await Recent.deleteOne({product:recents[0].product});
    }
    let result = await recent.save();
    res.send(result)
  }
  catch(errors){
    console.log(errors)
  return  res.status(500).send({error:"internal error"})
}
  })


  // get recents
  router.get('/getrecents',fetchuser,async(req,res)=>{
    try{
    let result = await Recent.find({user:req.user.email})
    if(result.length ===0){
      res.send({result:"no data"});
    }
    else{
      res.send(result)
    }
  }
  catch(errors){
    console.log(errors)
  return  res.status(500).send({error:"internal error"})
}
  })

module.exports = router;
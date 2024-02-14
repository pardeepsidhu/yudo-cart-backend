const express = require("express")
const router = express.Router()
const Product = require("../models/Product")


router.post("/addproduct",async(req,res)=>{
try{
    let product = new Product(req.body)
    let result = await product.save()
    res.send(result)
}
catch(errors){
    console.log(errors)
  return  res.status(500).send({error:"internal error"})
}
})


// delete a prouct
router.delete("/deleteproduct/:id",async(req,res)=>{
try{
    let result = await Product.deleteOne({_id:req.params.id})
    res.send(result);
    }
catch(errors){
        console.log(errors)
      return  res.status(500).send({error:"internal error"})
    }
  })
  
module.exports = router;
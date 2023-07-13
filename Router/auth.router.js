const { AUTHmodel } = require("../Models/auth.model");

const { Router } = require("express");
const auth123 = Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


auth123.get("/", async (req, res) => {
  try {
    let { email, password } = req.query;
    res.status(200).send("helloji");
  } catch (err) {
    res.status(400).send({"msg":err.message});
  }
});
auth123.post("/register",async(req,res)=>{
  const {email,password}=req.body;
  try{
    bcrypt.hash(password,5,async(err,hash)=>{
      if(err){
        res.status(400).json({error:err.message})
      }else{
        const user=new AUTHmodel({email,password:hash})
        await user.save()
      }
    })
    res.status(200).json({msg:"new user",updateduser:req.body})
  }catch(err){
    res.status(400).json({err12:err.message})
  }
})

auth123.post("/login",async(req,res)=>{
  const {email,password}=req.body;
  try{
    const user=await AUTHmodel.findOne({email})
    if(user){
      bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
          var token=jwt.sign({course:"backend"},"masai");
          res.status(200).json({msg:"login success",token})

        }else{
          res.status(200).json({msg:"wrong credentials"})
        }
      })
    }else{
      res.status(200).json({msg:"user invalid"})
    }
  }catch(err){
     res.status(400).json({err12:err.message})
  }
})
module.exports = {
  auth123
};

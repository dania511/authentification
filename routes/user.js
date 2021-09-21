const express=require('express')
const router=express.Router();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const {loginRules,registerRules,validation} = require ("../middlware/validator");
const User=require("../Models/User")
const isAuth = require("../middlware/passport");

//get 
router.get("/",(req,res)=>{res.send('hello word')})

//register
router.post("/register",registerRules(),validation,async(req,res)=>{const {name,LastName,email,password}=req.body;
try {
    const newUser=new User({name,LastName,email,password});
//check if email exist
const searchedUser=await User.findOne({email})
if(searchedUser){
    return res.status(400).send({msg:'email already used'})
}
    
//hash password
const salt=10
const genSalt=await bcrypt.genSalt(salt)
const hashedPassword=await bcrypt.hash(password,genSalt);
console.log(hashedPassword);
newUser.password=hashedPassword
//generate a token 



//save the user
    const newUserToken=await newUser.save()
    const payload={
        _id: newUserToken._id,
        name:newUserToken.name,
    }
    const token =await jwt.sign(payload,process.env.SectretOrKey,{expiresIn:3600});
    res.status(200).send({user: newUserToken,msg: "user is saved",token:`Bearer ${token}`})
} catch (error) {
    res.status(500).send("can not save the user")
}});
//login
router.post('/login',loginRules(),validation,async(req,res)=>{
const {email,password}=req.body
try {
    //find if the user exist
    const searchedUser= await User.findOne({email});
    //if the email not exist
    if (!searchedUser){
        return res.status(400).send({msg:'bad Credential'});
    }
//password are equals
    const match= await bcrypt.compare(password, searchedUser.password);
    if (!match){res.status(400).send({msg:'bad Credential'})};
//token creation
const payload={
    _id: searchedUser._id,
    name: searchedUser.name, 
}
const token =await jwt.sign(payload,process.env.SectretOrKey,{expiresIn:3600});
// console.log(token)
//send the user
     res.status(200).send({user:searchedUser,msg:'success',token:`Bearer ${token}`});
  } catch (error) {
    res.status(500).send({msg:'can not get the user'});
}
});


// get current user
router.get("/current",isAuth(),(req,res)=>{
    res.status(200).send({user:req.user})
})
module.exports=router;
const express=require('express')
const { UserModel } = require('../models/user.models')
const userRoute=express.Router()
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 4;

userRoute.post('/register',async(req,res)=>{
    const {email,password,age,location}=req.body
    try {
        bcrypt.hash(password, saltRounds, async(err, hash)=> {
            // Store hash in your password DB.
            const user=new UserModel({email,password:hash,age,location})
            await user.save()
            res.status(200).send({'msg':"Register data successfully"})
        });
        
    } catch (error) {
        res.status(400).send({'msg':error.message})
    }
})

userRoute.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try {
        
        const user=await UserModel.findOne({email})
        // console.log("user:",user)
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                // result == true
                res.status(200).send({'msg':"Login successfull!!!",'token':jwt.sign({ "userID": user._id }, 'pract')})
            });
        }else{
            res.status(400).send({'msg':'Login failed!!'})
        }
    } catch (error) {
        // res.status(400).send({'msg':error.message})
        console.log('error')
    }
})

userRoute.get("/details",(req,res)=>{
    console.log("reqheaders:",req.headers.authorization.split(" ")[1])
    let token=req.headers.authorization.split(" ")[1]
    console.log("token:",token)
    
    try {
        if(token){
            const decoded = jwt.verify(token, 'pract');
            console.log("decoded:",decoded)
            if(decoded){
                res.send({"msg":"details page"})
            }else{
                res.status(400).send({"msg11":error.message})
            }
        }
    } catch (error) {
        res.status(400).send({"msg12":error.message})
    }
    // res.send({"msg":"details page"})
})

module.exports={
    userRoute
}

// register--->password ko hash karo---->login---->hash ko decrypt ya match krke authority dedo--->
//
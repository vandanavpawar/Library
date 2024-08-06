const express = require("express")
const User = require('../model/usermodel')
const bcrypt = require('bcryptjs')
const cookieparser=require('cookie-parser')
const jwt = require('jsonwebtoken')

const app=express()
app.use(cookieparser())

const salt = bcrypt.genSaltSync(12)
const secret = "hjinkmewqdfsecfvbhnjkewqjkndesf"

exports.register=async(req,res,next)=>{

    const { name, email, password,role,admissionId,employeeId } = req.body
    if(name===null || email===null || password===null ){
        let error=("Some of the required fields are empty")
        return next(error)
        }
    try {
        const user = await User.create({ name, email, password: bcrypt.hashSync(password, salt),role,admissionId,employeeId })
        res.status(201).json({ data: {user}, message: "user sent successfully"})
    }
    catch (err) {res.status(400).json({ message: err.message})
    }
}
exports.login=async(req,res,next)=>{
    const { email, password } = req.body;
    if(email===null || password===null ){
    let error=("Enter the email and password")
     return res.status(500).json(error)
    }
    if (!email || !password) {
        const error = ("Enter the email and password")
        return res.status(500).json(error)
    }
    try{
    const user = await User.findOne({ email })
    let message = "logged in succesfully"
    let passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
        res.status(200).json({message,token: jwt.sign({ email, id: user._id }, secret, {})})
    } else {
        res.status(400).json('wrong credentials')
    }}
    catch(err){
        res.status(400).json({err:err.message})
    }
}


exports.getmyprofile=async(req,res,next)=>{
    try{
     let user=req.user
     res.status(200).json(user)
    }catch(err){
    res.json(400).json({err})
    }
}

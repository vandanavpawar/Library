const express = require("express")
const User = require('../model/usermodel')
const bcrypt = require('bcryptjs')
const cookieparser=require('cookie-parser')
const jwt = require('jsonwebtoken')
const authcontroller=require('../contollers/authcontroller')
const auth=require('../middleware/auth')

const router=express.Router();

const app=express()
app.use(cookieparser())

const salt = bcrypt.genSaltSync(12)
const secret = "hjinkmewqdfsecfvbhnjkewqjkndesf"


router.post('/register',authcontroller.register)
router.post('/login',authcontroller.login)
router.get('/getmyprofile',auth.isAuthenticated,authcontroller.getmyprofile)

module.exports=router
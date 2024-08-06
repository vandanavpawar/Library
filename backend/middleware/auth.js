const User = require('../model/usermodel')
const jwt = require('jsonwebtoken')

const secret = "hjinkmewqdfsecfvbhnjkewqjkndesf"

//AUTHENTICATION
exports.isAuthenticated = async (req, res, next) => {

    const token = req.header('Authentication')
    if (!token) {
        res.status(402).json('Not Authenticated')
    }
    const jwtToken = token.replace("Bearer", "").trim();
    //console.log(jwtToken);
    try {
        let verified = jwt.verify(jwtToken, secret)
        console.log(verified);
        let user = await User.findOne({ email: verified.email })
       // console.log(user);
        req.user = user;
        req.token = token;
        req.user.role=role;

    } catch (err) {
        res.status(402).json({ msg: err.message })
    }
    next()
}

//AUTHORIZATION
exports.isAuthorized = (role) => {
    return (req, res, next) => {
        console.log(req.user.role);      
        if (!role.includes(req.user.role)) {
            return res.status(401).json("you are not allowed to access this")
        }
        next()
    }
}
const express = require("express")
const router=express.Router()
const User =require('../model/usermodel');
const bcrypt = require('bcryptjs')

router.get('/getuserbyid/:id', async (req, res) => {

    if(req.body.isAdmin){
    try {
        const user = await User.findById(req.params.id)

        res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}else{
    res.status(400).json("not allowed to view users")
}
}
)

router.get('/getallusers', async (req, res) => {
    if(req.body.isAdmin){
    try {
        const users = await User.find()
        res.status(200).json(users)
    }
    catch (err) {
        return res.status(500).json(err);
    }
}else{
    res.status(400).json("not allowed to view user")
}
})
router.post('/updateuser/:id', async (req, res) => {

    if (req.body.id === req.params.id || req.body.isAdmin || req.body.isLibrarian) {
        if (req.body.password) {
            try {
                const salt = bcrypt.genSaltSync(10);
                req.body.password =  bcrypt.hashSync(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            res.status(200).json({ status: "Account has been updated", user });
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can update only your account!");
    }
})

router.post('/deleteuser/:id',async (req, res) => {
    if (req.body.id === req.params.id || req.body.isAdmin || req.body.isLibrarian) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
})

module.exports=router;
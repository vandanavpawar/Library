const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter the username"]
    },
    admissionId: {
        type: String,
        required:false,
        min: 3,
        max: 15,
    },
    employeeId: {
        type: String,
        min: 3,
        max: 15,
    },
    email: {
        type: String,
        required: [true, "Enter the email"],
        unique: [true, "This email id already exists"],
        trim: true,
        lowercase: true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
        ]
    },
    password: {
        type: String,
        required: [true, "Enter the password"]
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default:'user'
    }
})
const User = mongoose.model("User", UserSchema)

module.exports = User
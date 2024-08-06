const express = require('express')
const mongoose = require("mongoose")
const userrouter=require("./routes/userroute")
const booksrouter=require("./routes/booksroute")
const authroutes=require("./routes/authroute")
const cookieparser=require('cookie-parser')
const cors=require("cors")
const dotenv = require("dotenv")
const booksissuedrouter = require('./routes/booksissuedroute')


dotenv.config({ path: './config.env' });

const app=express()

app.use(express.json())
app.use(cookieparser())
app.use(cors({credentials:true,origin:'http://localhost:5174'}));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/app/v1',authroutes)
app.use('/app/v1/user',userrouter)
app.use('/app/v1/books',booksrouter)
app.use('/app/v1/issued',booksissuedrouter)

mongoose.connect(process.env.CONN_STR)
    .then(() => {
        console.log("DB Connected");
    }).catch((err) => {
        console.log(err);
    })


app.listen(4000,()=>{
    console.log("server created")
})
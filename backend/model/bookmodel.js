const {mongoose,Schema} = require('mongoose')

const bookSchema= new mongoose.Schema({
    title:{
        type:String
    },
    file:{
     type:String
    },
    author:{
        type:[String]
    },
    bookId:{
        type:Number
    },
    category:{
        type:String
    },
    borrowedby:[{
        type : Schema.Types.ObjectId,
        ref:"BooksIssued"
    }],
    publisher:{
        type:String,
    },
})

const Books = mongoose.model("Books",bookSchema)

module.exports = Books
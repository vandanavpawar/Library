const mongoose = require("mongoose")

const booksissuedSchema = new mongoose.Schema({
    bookId: {
        type: Number,
        require: true
    },
    borrowerId: { 
        type: String,
        require: true
    },
    bookName: {
        type: String,
        require: true
    },
    borrowerName: {
        type: String,
        require: true
    },
    fromDate: {
        type: String,
        require: true,
    },
    returnDate: {
        type: String
    },
})

module.exports = mongoose.model("BooksIssued",booksissuedSchema)
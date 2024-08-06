const express = require("express")
const router=express.Router()

const { default: mongoose } = require('mongoose');
const Books = require('../model/bookmodel')
const BooksIssued = require('../model/booksissued');

router.post('/addbookissue',async (req, res) => {
    const { bookId } = req.body
    if(req.body.isAdmin){
    try {
        const booksissued = await BooksIssued.create(req.body);
   
        let ObjId=new mongoose.Types.ObjectId(booksissued._id)
        await Books.updateOne({bookId:bookId},{ $push: { borrowedby: ObjId} })
        res.status(200).json({booksissued})
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}else{
    res.status(403).json("you are not allowed to add a book ")
}
}
)
router.get('/getallissuedbook',async (req, res) => {
    const books = await BooksIssued.find({})
    try {
        res.status(201).json({
            books
        })
    }
    catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
})
router.patch('/updateissue/:id', async (req, res) => {

    if(req.body.isAdmin){
    const book = await BooksIssued.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    try {
        res.status(200).json(book)
    } catch (err) {
        res.status(401).json({ err: err.message })
    }
}else {
    res.json("Access denied");}

})
router.delete('/deleteissue/:id', async (req, res) => {
    if(req.body.isAdmin) {
      try {
        const book = await BooksIssued.findByIdAndDelete(req.params.id);
        res.status(200).json("deleted");
      } catch (err) {
        res.status(500).json("Error" + err);
      }
    } else res.json("Access denied");
  });

  module.exports=router;
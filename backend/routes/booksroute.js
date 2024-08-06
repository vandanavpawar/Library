const express = require("express")
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs= require('fs')
const app=express()
const bookborrowed=require('../model/booksissued')
const Books = require('../model/bookmodel')
const User = require('../model/usermodel')
app.use('/uploads', express.static(__dirname + '/uploads'));


router.post('/addbook', upload.single('file'), async (req, res) => {
     //res.json({files:req.file})
    let { originalname,path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1]
    const newpath=path+'.'+ext;
    fs.renameSync(path,newpath)

     let {bookId,title,category,author,publisher}=req.body;
           try {
               const book = await Books.create({bookId,title,category,author,file:newpath,publisher})
               res.status(201).json({ book })
           }
           catch (err) {
               res.status(400).json({ message: err.message })
           }
}
)

router.get('/getallbooks', async (req, res) => {
    const books = await Books.find({}).populate({ path: "borrowedby", model: "BooksIssued" }).sort({ _id: -1 })
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

router.get('/getbookbyid/:id', async (req, res) => {

    const book = await Books.findById(req.params.id)
    try {
        res.status(200).json(book)
    } catch (err) {
        res.status(401).json({ err: err.message })
    }
})

router.patch('/updatebook/:id', async (req, res) => {
    const book = await Books.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    try {
        res.status(200).json(book)
    } catch (err) {
        res.status(401).json({ err: err.message })
    }
})

router.delete('/deletebook/:id', async (req, res) => {
    let id = req.params.id

    const book = await Books.findByIdAndDelete(req.params.id)
    try {
        res.status(200).json("Deleted")
    } catch (err) {
        res.status(401).json({ err: err.message })
    }
}
)

router.post('/borrow/:id', async (req, res) => {
    try {
        const book = await Books.findOne({ bookId: req.body.bookId })
        if (book == null) {
            return res.status(400).json("book not found");
        }
        const user = await User.findOne({admissionId:req.body.id})
        let email=user.email;
        let name=user.name;
        let _id=user._id;
        let bookId=book.bookId;
        let borrowerName=user.name;
        let borrowerId=user.admissionId;
        let bookName=book.title;
        console.log(email);
        
       //console.log(_id); 
        if (user == null) {
            return res.status(400).json("user not found");
        }
        //console.log(_id);
        await bookborrowed.create({bookId,borrowerName,borrowerId,bookName})
        await User.updateOne({admissionId:borrowerId},{$push:{booksborrowed:book}})
       
        console.log(_id);
        if (book.borrowedby.includes(user._id)) {
            return res.status(400).json({ error: "You've already borrowed this book" })
        }
        await book.updateOne({ borrowedby: [...book.borrowedby, user._id] })
        return res.status(200).json("book added")
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
})

router.post('/return', async (req, res) => {
    try {
        const book = await Books.findOne({ bookId: req.body.bookId })
        if (book == null) {
            return res.status(404).json({ error: "Book not found" })
        }
        const user = await User.findById(req.body.id)
        if (user == null) {
            return res.status(404).json({ error: "User not found" })
        }
        await book.updateOne({ borrowedby: book.borrowedby.filter((borrowedby) => !borrowedby.equals(user.id)), })

        return res.status(200).json("book returned")

    } catch (err) {
        console.log(err);
        return res.json({ err: err.message })

    }
}
)

module.exports = router;
import React, { useState } from 'react'

function Addbook() {

    const [bookId, setbookId] = useState('')
    const [title, settitle] = useState('')
    const [files,setfiles]=useState('')
    const [category, setcategory] = useState()
    const [author, setauthor] = useState([])
    const [publisher, setpublisher] = useState('')

    async function addbook (e)  {

        let data=new FormData()

        data.set('title',title)
        data.set('bookId',bookId)
        data.set('category',category)
        data.set('author',author)
        data.set('publisher',publisher)
        data.set('file',files[0])

        e.preventDefault();
          console.log(files);
          
       let res = await fetch('http://localhost:4000/app/v1/books/addbook', {
            method: 'POST',
            body:data,
        })
        
       // let response= await res.json()
        console.log(await res.json());
       // console.log(files);
       // console.log(response);
        

      /*try{
        if (res.status === 201) {
            alert('Book added scuessfully');
        } else {
            alert('failed');}}
            catch(err){
                res.json({err:err.message})
            }*/
     
    }

    return (
        <div className='formcontainer'>
            <form onSubmit={addbook} className="row g-3 form">
                <div className="col-md-6">
                    <label htmlFor="bookId" className="form-label" >bookId</label>
                    <input type="text" className="form-control" required id="bookId" value={bookId} onChange={(e)=>{setbookId(e.target.value)}}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="category" className="form-label" >category</label>
                    <select id="category" className="form-select"value={category} onChange={(e)=>{setcategory(e.target.value)}}>
                        <option defaultValue="Choose.">Choose...</option>
                        <option value="comedy">comedy</option>
                        <option value="knoledge">knowledge</option>
                        <option value="novel">novel</option>
                        <option value="science">science</option>
                    </select>
                </div>
                <div className="col-12">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" className="form-control" required id="title" value={title} onChange={e => settitle(e.target.value)} />
                </div>
                <div className="col-12">
                    <label htmlFor="files" className="form-label">image</label>
                    <input type="file" className="form-control" required id="files"  onChange={e => setfiles(e.target.files)} />
                </div>
                <div className="col-12">
                    <label htmlFor="author" className="form-label"  >author</label>
                    <input type="text" className="form-control" required id="author"value={author} onChange={(e)=>{setauthor(e.target.value)}} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="publisher" className="form-label" >Publisher</label>
                    <input type="text" className="form-control" id="publisher"  value={publisher} onChange={(e)=>{setpublisher(e.target.value)}} />
                </div>
                <div className="col-12">

                </div>
                <div className="col-sm-3 button ">
                    <button className="btn btn-primary ">Add Book</button>
                </div>
            </form>
        </div>
    )
}

export default Addbook

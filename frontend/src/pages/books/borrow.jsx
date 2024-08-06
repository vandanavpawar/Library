import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Borrow() {

    const[user,setuser]=useState("")
   const [data,setdata]=useState({
        title:"",
        bookId:"",
        author:"",
        publisher:"",
        file:""
    })

    const params=useParams()

 let getbookbyId=async()=>{
  try{
    let response=await fetch(`http://localhost:4000/app/v1/books/getbookbyid/${params.id}`,{
        method:'GET'
    });
    let data=await response.json()
    setdata(data)
  // console.log(data.bookId);
  }catch(err){
     console.log(err);    
  }
}

useEffect(()=>{
    getbookbyId()
},[])

const handleInput=(e)=>{
    let name=e.target.name;
    let value=e.target.value;

    setdata({
        ...data,
        [name]:value,
    })
}

let bookId=data.bookId

const handleborrow=async(e)=>{
e.preventDefault()

const response=await fetch(`http://localhost:4000/app/v1/books/borrow/${params.id}`,{
    method:'POST',
    headers: { 'Content-Type': 'application/json'},
    body:JSON.stringify({user,bookId})
})
if(response.ok){
    alert("book borrowed")
}
console.log(data.bookId);

}


  return (
    <div className='formcontainer'>
            <form onSubmit={handleborrow} className="row g-3 form">
            <div className="col-12">
                    <label htmlFor="title" className="form-label">Enter User Id</label>
                    <input type="text" className="form-control" required id="title" value={user} onChange={e => setuser(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="bookId" className="form-label" >bookId</label>
                    <input type="text" className="form-control" required id="bookId" value={data.bookId} onChange={(e)=>{setbookId(e.target.value)}}/>
                </div>
               
                <div className="col-12">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" className="form-control" required id="title" value={data.title} onChange={e => settitle(e.target.value)} />
                </div>
                <div className="col-12">
                    <label htmlFor="author" className="form-label"  >author</label>
                    <input type="text" className="form-control" required id="author"value={data.author} onChange={(e)=>{setauthor(e.target.value)}} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="publisher" className="form-label" >Publisher</label>
                    <input type="text" className="form-control" id="publisher"  value={data.publisher} onChange={(e)=>{setpublisher(e.target.value)}} />
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

export default Borrow

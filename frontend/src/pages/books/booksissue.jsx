import React from 'react'
import './table.css'
import { useState,useEffect } from 'react'

function Booksissue() {

    const [data,setdata]= useState([])

    useEffect(()=>{
       let res=fetch ('http://localhost:4000/app/v1/books/getallissuedbook',{
        method:'GET'
      })
      .then((res)=>{
        return res.json()
      })
      .then((data)=>{
        console.log(data.books);
        setdata(data.books)})
    },[])

  return (
   <>
    <center className='heading'>Books</center>
    <div>
        <table className="table tablecss">
 <thead>
    <tr>
      <th scope="col">sl.no</th>
      <th scope="col">Book Id</th>
      <th scope="col">Borrower Id</th>
      <th scope="col">BookName</th>
      <th scope="col">Borrower Name</th>
      <th scope="col">From Date</th>
      <th scope="col">Return Date</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item,index)=>{
    return( <tr key={item._id}>
      <th scope="row">{index+1}</th>
      <td>{item.bookId}</td>
      <td>{item.borrowerId}</td>
      <td>{item.bookName}</td>
      <td>{item.borrowerName}</td>
      <td>{item.fromDate}</td>
      <td>{item.returnDate}</td>
    </tr>)
    }
    )}
  </tbody>
</table>
      
    </div>
   </>
  )
}

export default Booksissue

import React, { useEffect, useState, useContext } from 'react'
import './table.css'
import Book from './book'

function Bookstable() {

  const [data, setdata] = useState([])

  useEffect(() => {
    let res = fetch('http://localhost:4000/app/v1/books/getallbooks', {
      method: 'GET'
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data.books);
        setdata(data.books)
      })
  }, [])

     let listitem= data.length > 0 && data.map((item, index) => {
        return (
          <>
            <Book
            _id={item._id}
            id={item.bookId}
            title={item.title}
            file={item.file}
            author={item.author}
            publisher={item.publisher}></Book>
          </>)
      })

      return(
        <div className='listitem'>{listitem}</div>
      )

      {/*<div>
   <div className='post'>
          <div className="image">
          <img src={'http://localhost:4000/'+item.file}></img>
          </div> 
   <table className="table tablecss">
 <thead>
    <tr>
      <th scope="col">sl.no</th>
      <th scope="col">image</th>
      <th scope="col">Title</th>
      <th scope="col">Author</th>
      <th scope="col">BookId</th>
      <th scope="col">Category</th>
      <th scope="col">Borrowedby</th>
      <th scope="col">Publisher</th>
      <th scope="col">Borrow</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item,index)=>{
    return( <tr key={item._id}>
      <th scope="row">{index+1}</th>
      <td>{<img src={`http:localhost:4000/${item.file}`} alt="" />}</td>
      <td>{item.title}</td>
      <td>{item.author}</td>
      <td>{item.bookId}</td>
      <td>{item.category}</td>
      <td>{item.borrowedby}</td>
      <td>{item.publisher}</td>
      <td><button >borrow</button></td>
    </tr>)
    }
    )}
  </tbody>
   </table>
    </div>*/}
}

export default Bookstable


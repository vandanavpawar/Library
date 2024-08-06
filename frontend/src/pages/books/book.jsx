import React from 'react'
import { Link } from 'react-router-dom'

function Book(item) {
    
  return (
    <>
    <div class="card-container">
      <div className="grid">
        <div class="card" style={{ width: "18rem" }}>
        
        <div className="card-body">
        <img src={'http://localhost:4000/'+item.file} class="card-img-top" alt="/" />
          <h2 class="card-title"><b>{item.title}</b></h2>
          <h5 class="card-title"><b>BookId:</b>{item.id}  </h5>
            <h6 class=""><b>author</b>: <i>{item.author}</i></h6>
            <h6 class="list-group-item"><b>published by:</b>{item.publisher}</h6>
            <Link to={`/borrow/${item._id}`} class="button">Borrow</Link>
            </div>
          </div>
      </div>
      </div>
  </>
  )
 }
export default Book

import React, { useContext, useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../usercontext'
import { AuthContext } from '../../../store/usecontext'

function Navbar() {
  
    const {setuser,isloggedin} = useContext(AuthContext)

    function logout() {
        fetch('http://localhost:4000/app/v1/logout', {
       credentials:'include',
       method:'POST'
    });
    setuser(null)
}

//let name = user?.name

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" >Library</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link active" aria-current="page" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Books</a>
                            </li>
                            {!isloggedin && (
                                 <>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link" >Login </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/register" className="nav-link " >Register</Link>
                                    </li>
                                </>
                            )}
                            {isloggedin &&(<>
                                    <li className="nav-item">
                                        <Link to="#" className="nav-link active" aria-current="page" >Borrow Books</Link>
                                    </li>
                                    <li className="nav-item">
                                    
                                    <Link to='/logout'  className="nav-link active" aria-current="page">Logout</Link>
                                </li></> )}           
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

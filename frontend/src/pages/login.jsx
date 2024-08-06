import React, { useContext, useState } from 'react'
import Bookstable from './books/bookstable'
import './login.css'
import Navbar from './homepage/navbar'
import { Navigate,useNavigate } from 'react-router-dom'
import { UserContext } from '../usercontext'
import { AuthContext } from '../../store/usecontext'


function Login() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [redirect,setredirect]=useState(false)
    const navigateTo = useNavigate();
    const {user,setuser} = useContext(UserContext)
    const {storeToken,isloggedin}=useContext(AuthContext)

     async function handlelogin(e){
        e.preventDefault()
        let res= await fetch('http://localhost:4000/app/v1/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{'Content-Type':'application/json'},
            credentials:'include',
        })

       if(res.status===200){
        res.json().then((user)=>{
            console.log(user);
            storeToken(user.token)
        })
        alert("logged in succesfully")
       }else if(res.status===400){
        alert("Invalid credentials")
       }else if(res.status===500){
        alert("Email and password is required")
       }
    }
    if (isloggedin) {
        return <Navigate to={'/books'}></Navigate>
      }
     
    
    return (
        <div>
            <center>
                <div className='wrapperL'>
                    <div className='form-box loginb'>
                        <form onSubmit={handlelogin}>
                            <div className="input-box">
                                <input type='email' placeholder='email' value={email} onChange={e => setemail(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <input type="password" placeholder='password' value={password} onChange={e => setpassword(e.target.value)} />
                            </div>
                            <div className="login-signup">
                             Dont Have Account ? <a href="/register">Register</a>
                            </div>
                            <button className='btn'>Login</button>
                        </form>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default Login

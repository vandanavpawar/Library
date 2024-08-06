import React, { useState } from 'react'
import'./login.css'
import Navbar from './homepage/navbar'

function Register() {

    const[name,setname]=useState('')
    const[admissionId,setadmissionId]=useState('')
    const[employeeId,setemployeeId]=useState('')
    const [role, setRole] = useState("");
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')

    async function register(e) {

        e.preventDefault()
        let res = await fetch('http://localhost:4000/app/v1/register',{
            method:'POST',
            body:JSON.stringify({name,admissionId,employeeId,email,password}),
            headers:{'Content-Type':'application/json'},
        })
        console.log(res);
        if(res.status===201){
            alert("registered Sucessfully")
        }else if(res.status===400){
            alert("Some of the required fields are empty")
        }
    }


  return (
    <div> 
     <center>
    <div className='wrapperR'>
    <div className='form-box loginb'>
      <form onSubmit={register} >
        <div className="input-box">
        <input type='text' placeholder='name' value={name} onChange={e => setname(e.target.value)} />
       </div>
        <div className="input-box">
        <input type='text' placeholder='admission Id' value={admissionId} onChange={e => setadmissionId(e.target.value)} />
       </div>
       <div className="input-box">
        <input type='text' placeholder='employee Id'  value={employeeId} onChange={e => setemployeeId(e.target.value)} />
       </div>
       <div className="input-box">
        <input type='email' placeholder='email'  value={email} onChange={e => setemail(e.target.value)} />
       </div>
        <div className="input-box">
        <input type="password" placeholder='password'  value={password} onChange={e => setpassword(e.target.value)}/>
        </div>
        <label for='role'>role
        <select value={role} id='role' onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select></label>
        <button className='btn'>Register</button>
      </form>
    </div>
    </div>
    </center>
      
    </div>
  )
}

export default Register

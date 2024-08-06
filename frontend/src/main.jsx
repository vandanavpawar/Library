import React from 'react'
import ReactDOM from 'react-dom/client'
import  { createContext, useState } from "react";
import { BrowserRouter } from 'react-router-dom'
import {  Usercontextprovider } from './usercontext.jsx'
import App from './App.jsx'
import { AuthProvider } from '../store/usecontext.jsx';

//export const Context =createContext({isAuthenticated:false})

const AppWrapper = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [user,setuser]=useState({})

  return(
    <AuthProvider>
     <App />
    </AuthProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

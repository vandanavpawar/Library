import Home from './pages/homepage/home'
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Logout from './components/logout'
import { useContext } from 'react'
import Register from './pages/register'
import Navbar from './pages/homepage/navbar'
import './App.css'
import Bookstable from './pages/books/bookstable'
import Booksissue from './pages/books/booksissue'
import Addbook from './pages/books/addbook'
import { UserContext } from './usercontext'
import Borrow from './pages/books/borrow'


function App() {
  //const {userInfo,setUserInfo} = useContext(UserContext)

 // let email = userInfo?.email

  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/books' element={<Bookstable/>}></Route>
      <Route path='/booksissued' element={<Booksissue/>}></Route>
      <Route path='/addbook' element={<Addbook/>}></Route>
      <Route path='/borrow/:id' element={<Borrow/>}></Route>
      <Route path='/logout' element={<Logout/>}></Route>
    </Routes>
    
    </>
  )
}

export default App

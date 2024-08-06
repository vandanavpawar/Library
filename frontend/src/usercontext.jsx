import {  createContext ,useState } from "react";

/**export const  UserContext = createContext({})

export  function Usercontextprovider({children}){

  const [userInfo,setUserInfo]=useState({})

  return(
    <UserContext.Provider value={{userInfo,setUserInfo}}>
    {children}
    </UserContext.Provider>
  )
}**/
export const UserContext=createContext({})

export const Usercontextprovider=({children})=>{

  const [isAuthenticated,setisAuthenticated]=useState(false)
  const [user,setuser]=useState({})

  return(
    <UserContext.Provider value={{user,setuser}}>
    {children}
    </UserContext.Provider>
  )
}

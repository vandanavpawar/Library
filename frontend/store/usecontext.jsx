import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    let [token, settoken] = useState(localStorage.getItem("token"))
    let [user,setuser]=useState("")

    const storeToken = (token) => {
        settoken(token)
        return localStorage.setItem("token", token)
    }

    let isloggedin = !!token

    const logout=()=>{
        settoken("")
        return localStorage.removeItem("token")
    }

    useEffect(() => {
        userAuthentication()
    }, [])

    const userAuthentication = async () => {
        try {
            let response = await fetch('http://localhost:4000/app/v1/getmyprofile', {
                method: 'GET',
                headers: { Authentication: `Bearer ${token}` }
            })
            if (response.status == 200) {
                let data = await response.json()
                setuser(data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{ storeToken,isloggedin,logout, token,setuser,user }}>
            {children}
        </AuthContext.Provider>)
}




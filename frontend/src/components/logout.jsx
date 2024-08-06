import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../store/usecontext'
import { Navigate } from 'react-router-dom'

function Logout() {

    const { logout } = useContext(AuthContext)

    useEffect(()=>{
        logout()
    },[logout])
    return <Navigate to='/login'></Navigate>
}

export default Logout

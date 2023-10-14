import React, { useContext } from 'react'
import { Authcontext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Login from '../Login/Login'

function ProtectedRoute({children}) {
let navigate = useNavigate()
    let {isUserLoggedIn} = useContext(Authcontext)
    if(isUserLoggedIn){
return children
    } else {
        return <Login/>
    }
 
}

export default ProtectedRoute
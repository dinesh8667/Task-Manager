import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({children}) => {
    const isLogIn = localStorage.getItem('isLogIn')
  return isLogIn ? children : <Navigate to={'/login'}/>
}

export default PrivateRouter
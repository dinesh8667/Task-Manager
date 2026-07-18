import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'

const index = () => {
    const navigate = useNavigate()
  return (
    <div className='error-page'>
        <img src="page-not-found.png" alt="page-not-found" />
        <button onClick={()=>navigate('/')}><i className="bi bi-arrow-left"></i> Back to Dashboard</button>
    </div>
  )
}

export default index
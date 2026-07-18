import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRouter from './privateRouter'
import ScrollToTop from './pages/ScrollToTop'
import Navbar from './layouts/navbar'
import SignUp from './pages/signup'
import LogIn from './pages/login'
import Dashboard from './pages/dashboard'
import Create from './pages/create'
import Edit from './pages/edit'
import Profile from './pages/profile'
import NotFound from './pages/notFound'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/dashboard' element={
          <PrivateRouter>
            <Dashboard />
          </PrivateRouter>
        } />
        <Route path='/create' element={
          <PrivateRouter>
            <Create />
          </PrivateRouter>
        } />
        <Route path='/edit/:id' element={
          <PrivateRouter>
            <Edit />
          </PrivateRouter>
        } />
        <Route path='/profile' element={
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        } />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
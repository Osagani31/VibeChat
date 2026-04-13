import React from 'react'
import {  Navigate, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { Route } from 'react-router-dom'
import assets from './assets/assets'
import { Toaster } from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextValue.js'

const App = () => {
  const{authUser} = useContext(AuthContext);
  return (
    <div
      className='bg-cover bg-center min-h-screen w-screen'
      style={{ backgroundImage: `url(${assets.bgImage})` }}
    >
      <Toaster />
      <Routes>
      <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
      <Route path='/login' element={authUser ? <Navigate to="/" /> : <LoginPage />} />
      <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
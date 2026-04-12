import React from 'react'
import {  Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { Route } from 'react-router-dom'
import assets from './assets/assets'

const App = () => {
  return (
    <div
      className='bg-cover bg-center min-h-screen w-screen'
      style={{ backgroundImage: `url(${assets.bgImage})` }}
    >
      <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
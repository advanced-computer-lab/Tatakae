import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SignIn from './SignIn'
import Dashboard from './admin/Dashboard'
import CreateFlight from './admin/CreateFlight'
import NotFound from './NotFound';
import MainPage from './MainPage';
import Seats from './user/Seats'

export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/logIn" element={<SignIn/>} />
          <Route exact path='/home' element={<Dashboard/>} />
          <Route exact path='/Create-Flight' element={<CreateFlight/>} />
          <Route path='/wrongURL' element={<NotFound/>} />
          <Route path='/Seats' element={<Seats/>} />
        </Routes>
    </div>
  )
}


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SignIn from './SignIn'
import Dashboard from './admin/Dashboard'
import CreateFlight from './admin/CreateFlight'
import NotFound from './NotFound';
import UserDashboard from './user/Dashboard'

export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route exact path='/home' element={<Dashboard/>} />
          <Route exact path='/Create-Flight' element={<CreateFlight/>} />
          <Route exact path='/userHome' element={<UserDashboard/>} />
          <Route path='/wrongURL' element={<NotFound/>} />
        </Routes>
    </div>
  )
}


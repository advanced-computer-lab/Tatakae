import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import CreateFlight from './CreateFlight'
import NotFound from './NotFound';



export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route exact path='/home' element={<Dashboard/>} />
          <Route exact path='/Create-Flight' element={<CreateFlight/>} />
          <Route path='/wrongURL' element={<NotFound/>} />
        </Routes>
    </div>
  )
}


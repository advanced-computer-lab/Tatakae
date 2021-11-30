import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import CreateFlight from './admin/CreateFlight'
import NotFound from './NotFound';
import MainPage from './MainPage';
import Plane from './user/Plane'
import EditProfile from './user/EditProfile';

export default function App() {
  return (
    <div>
        <Routes>
          <Route exact path="/" element={<MainPage/>} />
          <Route exact path="/logIn" element={<SignIn/>} />
          <Route exact path='/home' element={<Dashboard/>} />
          <Route exact path='/CreateFlight' element={<CreateFlight/>} />
          <Route exact path='/EditProfile' element={<EditProfile/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
    </div>
  )
}


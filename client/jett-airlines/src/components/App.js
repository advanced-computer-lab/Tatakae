import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import CreateFlight from './admin/CreateFlight'
import NotFound from './NotFound';
import MainPage from './MainPage';
import EditProfile from './user/EditProfile';
import Plane from './user/Plane'
import ReturnPlane from './user/ReturnPlane'
import TicketBoard from './user/TicketBoard'
import SignUp from './SignUp'

export default function App() {
  return (
    <div>
        <Routes>
          <Route exact path="/" element={<MainPage/>} />
          <Route exact path="/logIn" element={<SignIn/>} />
          <Route exact path='/home' element={<Dashboard/>} />
          <Route exact path='/CreateFlight' element={<CreateFlight/>} />
          <Route exact path='/EditProfile' element={<EditProfile/>} />
          <Route exact path='/Plane/:id' element={<Plane/>} />
          <Route exact path='/ReturnPlane/:id' element={<ReturnPlane/>} />
          <Route exact path='/TicketBoard' element={<TicketBoard/>} />
          <Route exact path='/SignUp' element={<SignUp/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
    </div>
  )
}


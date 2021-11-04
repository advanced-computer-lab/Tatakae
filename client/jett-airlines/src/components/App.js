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
          <Route path="/" component={SignIn} />
          <Route exact path='/home' component={Dashboard} />
          <Route exact path='/Create-Flight' component={CreateFlight} />
          <Route exact path='/wrongURL' component={NotFound} />
        </Routes>
    </div>
  )
}


import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn'
import Dashboard from './Dashboard'
import CreateFlight from './CreateFlight'
import NotFound from './NotFound';



export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact component={SignIn} />
          <Route path='/home' exact component={Dashboard} />
          <Route path='/Create-Flight' exact component={CreateFlight} />
          <Route path='/wrongURL' exact component={NotFound} />
        </Routes>
      </Router>
    </div>
  )
}


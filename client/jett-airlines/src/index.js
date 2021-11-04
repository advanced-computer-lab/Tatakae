import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import SignIn from './components/SignIn'
import CreateFlight from './components/CreateFlight'
import Dashboard from './components/Dashboard'
import FlightCard from './components/FlightCard'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(<BrowserRouter>
<Dashboard />
</BrowserRouter>
  ,document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import TicketCard from "./components/user/TicketCard"
ReactDOM.render(<BrowserRouter>
<App />
</BrowserRouter>
  ,document.getElementById('root')
);

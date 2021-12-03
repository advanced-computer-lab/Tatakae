import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import TicketCard from './components/user/TicketCard';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(<BrowserRouter>
<App />
</BrowserRouter>
  ,document.getElementById('root')
);

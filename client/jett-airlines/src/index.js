import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import TicketBoard from './components/user/TicketBoard';

ReactDOM.render(<BrowserRouter>
<App />
</BrowserRouter>
  ,document.getElementById('root')
);

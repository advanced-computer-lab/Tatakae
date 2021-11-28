import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import CreateFlight from './components/admin/CreateFlight';

ReactDOM.render(<BrowserRouter>
<App />
</BrowserRouter>
  ,document.getElementById('root')
);

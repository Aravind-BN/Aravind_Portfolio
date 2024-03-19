import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../src/components/commonitems/Navbar';


ReactDOM.render(
  <Router>
    <Navbar />
  </Router>,
  document.getElementById('root')
);

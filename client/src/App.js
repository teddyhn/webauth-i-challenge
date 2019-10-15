import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './Navigation/Navigation';
import Login from './Login/Login';
import Register from './Register/Register';
import UsersList from './UsersList/UsersList';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Navigation} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/users" component={UsersList} />
      </Router>
    </div>
  );
}

export default App;

import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import GithubState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import AlertState from './context/alert/AlertState';
import setauthtoken from './components/utils/setauthtoken';
import PrivateRoute from './components/routing/PrivateRoute';
if (localStorage.token) {
  setauthtoken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <GithubState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <Alert />
              <div className='container'>
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </GithubState>
    </AuthState>
  );
};

export default App;

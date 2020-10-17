import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import jwt_decode from 'jwt-decode';

import PrivateRoute from './components/PrivateRoute';

import Landing from './views/landing';
import { Login, SignUp } from './views/auth/';
import User from './views/user';
import Profile from './views/profile';
import Project from './views/project';
import Liked from './views/liked';
import Search from './views/search';
import Hot from './views/hot';
import MyProjects from './views/myprojects';

import store from './store';
import { logout } from './actions/auth';
import { SET_USER } from './actions/types';
import isEmpty from './utils/isEmpty';
import setAuthToken from './utils/setAuthToken';

// Check for token in local storage (in-case app is reloaded/reopened)
if(!isEmpty(localStorage.accessToken)){
  setAuthToken(localStorage.accessToken);
  const decoded: any = jwt_decode(localStorage.accessToken);
  const { exp: expiryTime, id, username }: { exp: number; id: number; username: string } = decoded;
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(expiryTime < currentTime){
    store.dispatch(logout());
    window.location.href = '/login';
  }
  else{
    store.dispatch({
      type: SET_USER,
      payload: {
        isAuthenticated: true,
        id,
        username,
      }
    })
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Helmet>
          <title>Pluto</title>
        </Helmet>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/signin' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/user/:userId' component={User} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <Route exact path='/project/:projectId' component={Project} />
          <Route exact path='/hot' component={Hot} />
          <PrivateRoute exact path='/liked' component={Liked} />
          <PrivateRoute exact path='/myprojects' component={MyProjects} />
          <Route exact path='/search' component={Search} />
          {/* Default route */}
          <Route component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

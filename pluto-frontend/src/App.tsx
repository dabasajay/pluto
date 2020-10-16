import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import PrivateRoute from './components/PrivateRoute';

import Landing from './views/landing';
import { Login, SignUp } from './views/auth/';
import Profile from './views/profile';
import Project from './views/project';
import Liked from './views/liked';
import Search from './views/search';

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
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/signin' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/project' component={Project} />
          <PrivateRoute exact path='/liked' component={Liked} />
          <Route exact path='/search' component={Search} />
          {/* Default route */}
          <Route component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

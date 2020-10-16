import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userStateType } from '../../reducers/user';

function PrivateRoute(props: any) {
  const { component: Component, ...rest} = props;

  // @ts-expect-error
  const user: userStateType = useSelector(state => state.user);
  const { isAuthenticated } = user;

  if (isAuthenticated !== true) {
    // If not logged in, redirect to login page
    return <Redirect to='/login'/>;
  }

  // If loggin in, render the component
  return <Route {...rest} component={Component} />
}

export default PrivateRoute;
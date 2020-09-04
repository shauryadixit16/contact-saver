import React, { useContext } from 'react';
import authContext from '../../context/auth/authContext';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const authcontext = useContext(authContext);
  const { loading, isAuthenticated } = authcontext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default PrivateRoute;

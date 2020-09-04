import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import contactContext from '../../context/contact/contactContext';

const Navbar = () => {
  const authcontext = useContext(authContext);
  const contactcontext = useContext(contactContext);
  const { user, isAuthenticated, logout, loading } = authcontext;
  const inlogout = () => {
    logout();
    contactcontext.clearContacts();
  };
  const authlinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a href='#!' onClick={inlogout}>
          <i className='fas fa-sign-out-alt'>Logout</i>
        </a>
      </li>
    </Fragment>
  );
  const guestlinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className='fas fa-id-card-alt' /> Contact Keeper
      </h1>
      <ul>{!isAuthenticated ? guestlinks : authlinks}</ul>
    </div>
  );
};
export default Navbar;

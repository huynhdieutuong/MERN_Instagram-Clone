import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Logo from '../../images/loginLogo.png';

import { setAlert } from '../../redux/actions/alerts';

const Login = ({ setAlert }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    setAlert('success', 'Success Login');
  };

  return (
    <Fragment>
      <div className='login__box'>
        <img src={Logo} alt='logo' className='login__logo' />
        <form className='login__form' onSubmit={onSubmit}>
          <input type='email' name='email' placeholder='Email' />
          <input type='password' name='password' placeholder='Password' />
          <input type='submit' value='Log in' />
        </form>
        <span className='login__divider'>or</span>
        <Link to='#!' className='login__link'>
          <i className='fa fa-money'></i>
          Log in with Facebook
        </Link>
        <Link to='/forgotpassword' className='login__link login__link--small'>
          Forgot password ?
        </Link>
      </div>
      <div className='login__box'>
        <span>Don't have an account?</span> <Link to='/register'>Sign up</Link>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Login);

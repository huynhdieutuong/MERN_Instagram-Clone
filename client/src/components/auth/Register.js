import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logo from '../../images/loginLogo.png';

const Register = (props) => {
  return (
    <Fragment>
      <div className='login__box'>
        <img src={Logo} alt='logo' className='login__logo' />
        <form className='login__form'>
          <input type='text' name='name' placeholder='Full Name' />
          <input type='email' name='email' placeholder='Email' />
          <input type='password' name='password' placeholder='Password' />
          <input
            type='password'
            name='password2'
            placeholder='Confirmation Password'
          />
          <input type='submit' value='Sign up' />
        </form>
      </div>
      <div className='login__box'>
        <span>Have an account?</span> <Link to='/login'>Login</Link>
      </div>
    </Fragment>
  );
};

Register.propTypes = {};

export default Register;

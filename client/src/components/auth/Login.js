import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';

import Logo from '../../images/loginLogo.png';

import { login } from '../../redux/actions/auth';

const Login = ({ auth: { loading, isAuthenticated }, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Fragment>
      <div className='login__box'>
        <img src={Logo} alt='logo' className='login__logo' />
        {loading ? (
          <Spin />
        ) : isAuthenticated ? (
          <Alert message='Login Success' type='success' />
        ) : (
          <form className='login__form' onSubmit={onSubmit}>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={onChange}
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={onChange}
              required
            />
            <input type='submit' value='Log in' />
          </form>
        )}
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
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);

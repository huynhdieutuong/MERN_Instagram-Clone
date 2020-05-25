import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, Spin } from 'antd';

import Logo from '../../images/loginLogo.png';

import { setAlert } from '../../redux/actions/alerts';
import { register } from '../../redux/actions/auth';

const Register = ({ setAlert, register, auth: { loading } }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [msg, setMsg] = useState(null);

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('error', 'Password do not match');
    } else {
      const res = await register(name, email, password);

      if (res) setMsg(res);
    }
  };

  return (
    <Fragment>
      <div className='login__box'>
        <img src={Logo} alt='logo' className='login__logo' />
        {loading ? (
          <div>
            <Spin />
          </div>
        ) : !msg ? (
          <form className='login__form' onSubmit={onSubmit}>
            <input
              type='text'
              name='name'
              placeholder='Full Name'
              value={name}
              onChange={onChange}
              required
            />
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
            <input
              type='password'
              name='password2'
              placeholder='Confirmation Password'
              value={password2}
              onChange={onChange}
              required
            />
            <input type='submit' value='Sign up' />
          </form>
        ) : (
          <Alert message='Register Success' description={msg} type='success' />
        )}
      </div>
      <div className='login__box'>
        <span>Have an account?</span> <Link to='/login'>Login</Link>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

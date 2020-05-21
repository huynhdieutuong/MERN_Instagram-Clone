import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';

import Logo from '../../images/loginLogo.png';

import { resetPassword } from '../../redux/actions/auth';

const ResetPassword = ({
  auth: { loading, isAuthenticated },
  resetPassword,
  match,
}) => {
  const [formData, setFormData] = useState({
    password: '',
  });

  const { password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    resetPassword(match.params.token, password);
  };

  return (
    <Fragment>
      <div className='login__box'>
        <img src={Logo} alt='logo' className='login__logo' />
        {loading ? (
          <div>
            <Spin />
          </div>
        ) : isAuthenticated ? (
          <Alert message='Password Changed' type='success' />
        ) : (
          <form className='login__form' onSubmit={onSubmit}>
            <input
              type='password'
              name='password'
              placeholder='New Password'
              value={password}
              onChange={onChange}
              required
            />
            <input type='submit' value='Update' />
          </form>
        )}
      </div>
      <div className='login__box'>
        <span>Don't have an account?</span> <Link to='/register'>Sign up</Link>
      </div>
    </Fragment>
  );
};

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);

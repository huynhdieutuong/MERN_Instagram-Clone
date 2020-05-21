import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';

import Logo from '../../images/loginLogo.png';

import { forgotPassword } from '../../redux/actions/auth';

const ForgotPassword = ({ auth: { loading, isSendEmail }, forgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);
  };

  return (
    <Fragment>
      <div className='login__box'>
        <img src={Logo} alt='logo' className='login__logo' />
        {loading ? (
          <div>
            <Spin />
          </div>
        ) : isSendEmail ? (
          <Alert
            message='Email Sent'
            description={`A reset password email has been sent to ${email}`}
            type='success'
          />
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
            <input type='submit' value='Submit' />
          </form>
        )}
      </div>
      <div className='login__box'>
        <span>Don't have an account?</span> <Link to='/register'>Sign up</Link>
      </div>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);

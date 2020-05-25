import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Result, Button, Spin, Alert } from 'antd';

import Spinner from '../layout/Spinner';

import { resendEmail, logout } from '../../redux/actions/auth';

const NotVerify = ({
  auth: { loading2, isAuthenticated, user, loading },
  resendEmail,
  logout,
}) => {
  const [msg, setMsg] = useState('');

  const onResend = async () => {
    const res = await resendEmail();

    if (res) setMsg(res);
  };

  if (loading2) return <Spinner />;

  if (!isAuthenticated) return <Redirect to='/login' />;

  if (user && user.isVerified) return <Redirect to='/' />;

  return (
    <main id='login'>
      <Result
        status='warning'
        title='Your account is not verify email'
        subTitle='Check your email to verify. If you are not receive email, please click button Resend Email.'
        extra={
          loading ? (
            <div className='spinner-shot'>
              <Spin />
            </div>
          ) : !msg ? (
            <Fragment>
              <Button onClick={onResend} type='primary'>
                Resend Email
              </Button>
              <Button onClick={() => logout()}>Logout</Button>
            </Fragment>
          ) : (
            <Alert message='Email Sent' description={msg} type='success' />
          )
        }
      />
    </main>
  );
};

NotVerify.propTypes = {
  auth: PropTypes.object.isRequired,
  resendEmail: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { resendEmail, logout })(NotVerify);

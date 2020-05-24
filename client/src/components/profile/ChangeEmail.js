import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Spin } from 'antd';

import { changeEmail } from '../../redux/actions/auth';

const ChangeEmail = ({ changeEmail, auth: { loading } }) => {
  useEffect(() => {
    localStorage.setItem('currentTabEdit', 'change-email');
    // eslint-disable-next-line
  }, []);

  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    currentPassword: '',
    email: '',
  });

  const { currentPassword, email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await changeEmail(formData);

    if (res) {
      setResult(res);

      setFormData({
        currentPassword: '',
        email: '',
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className='edit-profile__form'>
      {loading ? (
        <div className='spinner spinner-short'>
          <Spin />
        </div>
      ) : (
        <Fragment>
          <div className='form__row'>
            <label htmlFor='currentPassword' className='form__label'>
              Current Password:
            </label>
            <input
              id='currentPassword'
              type='password'
              className='form__input'
              name='currentPassword'
              value={currentPassword}
              onChange={onChange}
            />
          </div>
          <div className='form__row'>
            <label htmlFor='email' className='form__label'>
              New Email:
            </label>
            <input
              id='email'
              type='email'
              className='form__input'
              name='email'
              value={email}
              onChange={onChange}
            />
          </div>
          <input type='submit' value='Change Email' />
          {result && (
            <div className='email-sent'>
              <Alert message='Email Sent' description={result} type='success' />
            </div>
          )}
        </Fragment>
      )}
    </form>
  );
};

ChangeEmail.propTypes = {
  changeEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changeEmail })(ChangeEmail);

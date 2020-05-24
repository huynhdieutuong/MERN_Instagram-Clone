import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setAlert } from '../../redux/actions/alerts';
import { changePassword } from '../../redux/actions/auth';

const ChangePassword = ({ setAlert, changePassword }) => {
  useEffect(() => {
    localStorage.setItem('currentTabEdit', 'change-password');
    // eslint-disable-next-line
  }, []);

  const [formData, setFormData] = useState({
    currentPassword: '',
    password: '',
    password2: '',
  });

  const { currentPassword, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('error', 'Confirm Password Wrong');
    } else {
      const success = await changePassword({ currentPassword, password });

      if (success) {
        setFormData({
          currentPassword: '',
          password: '',
          password2: '',
        });
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className='edit-profile__form'>
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
        <label htmlFor='password' className='form__label'>
          New Password:
        </label>
        <input
          id='password'
          type='password'
          className='form__input'
          name='password'
          value={password}
          onChange={onChange}
        />
      </div>
      <div className='form__row'>
        <label htmlFor='password2' className='form__label'>
          Confirm New Password:
        </label>
        <input
          id='password2'
          type='password'
          className='form__input'
          name='password2'
          value={password2}
          onChange={onChange}
        />
      </div>
      <input type='submit' value='Change Password' />
    </form>
  );
};

ChangePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, changePassword })(ChangePassword);

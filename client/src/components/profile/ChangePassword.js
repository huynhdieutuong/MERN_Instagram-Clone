import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ChangePassword = () => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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

ChangePassword.propTypes = {};

export default ChangePassword;

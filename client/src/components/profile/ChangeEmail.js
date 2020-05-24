import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ChangeEmail = () => {
  useEffect(() => {
    localStorage.setItem('currentTabEdit', 'change-email');
    // eslint-disable-next-line
  }, []);

  const [formData, setFormData] = useState({
    currentPassword: '',
    email: '',
  });

  const { currentPassword, email } = formData;

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
    </form>
  );
};

ChangeEmail.propTypes = {};

export default ChangeEmail;

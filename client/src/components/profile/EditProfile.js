import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editProfile } from '../../redux/actions/auth';

const EditProfile = ({ auth: { user }, editProfile }) => {
  useEffect(() => {
    localStorage.setItem('currentTabEdit', 'edit-profile');
    // eslint-disable-next-line
  }, []);

  const [formData, setFormData] = useState({
    name: user.name,
  });

  const { name } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editProfile(formData);
  };

  return (
    <form onSubmit={onSubmit} className='edit-profile__form'>
      <div className='form__row'>
        <label htmlFor='full-name' className='form__label'>
          Name:
        </label>
        <input
          id='full-name'
          type='text'
          className='form__input'
          name='name'
          value={name}
          onChange={onChange}
        />
      </div>
      <div className='form__row'>
        <label htmlFor='website' className='form__label'>
          Website:
        </label>
        <input id='website' type='url' className='form__input' disabled />
      </div>
      <div className='form__row'>
        <label htmlFor='bio' className='form__label'>
          Bio:
        </label>
        <textarea id='bio' disabled></textarea>
      </div>
      <div className='form__row'>
        <label htmlFor='phone' className='form__label'>
          Phone Number:
        </label>
        <input id='phone' type='tel' className='form__input' disabled />
      </div>
      <div className='form__row'>
        <label htmlFor='gender' className='form__label'>
          Gender:
        </label>
        <select id='gender' disabled>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='cant'>Can't remember</option>
        </select>
      </div>
      <input type='submit' value='Submit' />
    </form>
  );
};

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  editProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editProfile })(EditProfile);

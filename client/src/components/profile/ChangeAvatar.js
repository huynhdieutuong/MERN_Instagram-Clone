import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';

import { changeAvatar } from '../../redux/actions/auth';

const ChangeAvatar = ({ avatar, changeAvatar, auth: { loading } }) => {
  const fileInput = useRef(null);

  const onUpload = (e) => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    changeAvatar(formData);
  };

  if (loading)
    return (
      <div>
        <Spin />
      </div>
    );

  return (
    <Fragment>
      <input
        style={{ display: 'none' }}
        type='file'
        ref={fileInput}
        onChange={onUpload}
      />
      <img
        title='Change Profile Photo'
        style={{ cursor: 'pointer' }}
        src={`uploads/avatars/${avatar}`}
        alt='avatar'
        onClick={() => fileInput.current.click()}
      />
    </Fragment>
  );
};

ChangeAvatar.propTypes = {
  avatar: PropTypes.string.isRequired,
  changeAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changeAvatar })(ChangeAvatar);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';

import { confirmationEmail } from '../../redux/actions/auth';

const Confirmation = ({
  match,
  auth: { loading, isAuthenticated, error },
  confirmationEmail,
}) => {
  useEffect(() => {
    confirmationEmail(match.params.token);
    // eslint-disable-next-line
  }, []);

  return (
    <main id='login'>
      <div className='login__column'>
        {loading ? (
          <Spin />
        ) : isAuthenticated ? (
          <Alert
            message='Success Confirmation Email'
            description='Success confirmation email. You can login to upload your photos.'
            type='success'
          />
        ) : (
          <Alert message='Error' description={error} type='error' />
        )}
      </div>
    </main>
  );
};

Confirmation.propTypes = {
  confirmationEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { confirmationEmail })(Confirmation);

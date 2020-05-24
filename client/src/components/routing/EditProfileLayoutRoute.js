import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditProfileLayout from '../layout/EditProfileLayout';
import Spinner from '../layout/Spinner';

const EditProfileLayoutRoute = ({
  auth: { loading2, isAuthenticated },
  component: Component,
  ...rest
}) => {
  if (loading2) return <Spinner />;

  if (!isAuthenticated) return <Redirect to='/login' />;

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <EditProfileLayout>
          <Component {...matchProps} />
        </EditProfileLayout>
      )}
    />
  );
};

EditProfileLayoutRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(EditProfileLayoutRoute);

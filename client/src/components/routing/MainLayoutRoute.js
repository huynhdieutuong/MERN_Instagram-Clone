import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MainLayout from '../layout/MainLayout';
import Spinner from '../layout/Spinner';

const MainLayoutRoute = ({
  auth: { loading2, isAuthenticated, user },
  component: Component,
  ...rest
}) => {
  if (loading2) return <Spinner />;

  if (!isAuthenticated) return <Redirect to='/login' />;

  if (user && !user.isVerified) return <Redirect to='/not-verify' />;

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <MainLayout>
          <Component {...matchProps} />
        </MainLayout>
      )}
    />
  );
};

MainLayoutRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MainLayoutRoute);

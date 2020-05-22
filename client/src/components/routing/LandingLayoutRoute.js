import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LandingLayout from '../layout/LandingLayout';
import Spinner from '../layout/Spinner';

const LandingLayoutRoute = ({
  auth: { loading2, isAuthenticated },
  component: Component,
  ...rest
}) => {
  if (loading2) return <Spinner />;

  if (isAuthenticated) return <Redirect to='/' />;

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <LandingLayout>
          <Component {...matchProps} />
        </LandingLayout>
      )}
    />
  );
};

LandingLayoutRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(LandingLayoutRoute);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';

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

  if (loading) return <Spinner />;

  return (
    <main id='login'>
      {isAuthenticated ? (
        <Result
          status='success'
          title='Success Confirmation Email'
          subTitle='Success confirmation email. Now you can upload your photos.'
          extra={
            <Link to='/'>
              <Button type='primary'>Go to Feeds</Button>
            </Link>
          }
        />
      ) : (
        <Result
          status='warning'
          title={error}
          extra={
            <Link to='/not-verify'>
              <Button type='primary'>Get New Token</Button>
            </Link>
          }
        />
      )}
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

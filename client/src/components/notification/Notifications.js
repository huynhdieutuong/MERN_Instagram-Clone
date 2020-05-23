import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { getNotifications } from '../../redux/actions/notification';

import NotificationItem from './NotificationItem';

const Notifications = ({
  notification: { loading, notifications },
  getNotifications,
}) => {
  useEffect(() => {
    getNotifications();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className='arrow-nav'></div>
      <div className='notifications-title'>
        Notifications
        <span>
          <span>Mark All as Read</span> <span>Clear All</span>
        </span>
      </div>
      <ul className='notifications'>
        {loading ? (
          <li style={{ justifyContent: 'center' }}>
            <Spin />
          </li>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))
        ) : (
          <li>No notifications...</li>
        )}
      </ul>
    </Fragment>
  );
};

Notifications.propTypes = {
  notification: PropTypes.object.isRequired,
  getNotifications: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

export default connect(mapStateToProps, { getNotifications })(Notifications);

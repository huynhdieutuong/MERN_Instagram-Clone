import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import {
  getNotifications,
  markAllReadNotifications,
  clearAllNotifications,
} from '../../redux/actions/notification';

import NotificationItem from './NotificationItem';

const Notifications = ({
  notification: { loading, notifications },
  getNotifications,
  markAllReadNotifications,
  clearAllNotifications,
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
          <span onClick={() => markAllReadNotifications()}>
            Mark All as Read
          </span>{' '}
          <span onClick={() => clearAllNotifications()}>Clear All</span>
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
  markAllReadNotifications: PropTypes.func.isRequired,
  clearAllNotifications: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

export default connect(mapStateToProps, {
  getNotifications,
  markAllReadNotifications,
  clearAllNotifications,
})(Notifications);

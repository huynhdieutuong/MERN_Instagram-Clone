import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import {
  markReadNotification,
  clearNotification,
} from '../../redux/actions/notification';

const NotificationItem = ({
  notification: { guest, post, type, date, isRead, _id },
  markReadNotification,
  clearNotification,
}) => {
  return (
    <li className={!isRead ? 'not-read' : ''}>
      <a href='#!'>
        <img src={`/uploads/avatars/${guest.avatar}`} alt='avatar guest' />
        <span>
          <p>
            {guest.name} {type === 'like' ? 'liked' : 'commented'} on your post
          </p>
          <span>
            <Moment fromNow>{date}</Moment>
          </span>
        </span>
        <img src={`/uploads/photos/${post.image}`} alt='your post' />
        <div className='actions'>
          <i
            title='Clear This'
            className='fas fa-times'
            onClick={() => clearNotification(_id)}
          ></i>
          <i
            title='Mark as Read'
            className='far fa-dot-circle'
            onClick={() => markReadNotification(_id)}
          ></i>
        </div>
      </a>
    </li>
  );
};

NotificationItem.propTypes = {
  markReadNotification: PropTypes.func.isRequired,
  clearNotification: PropTypes.func.isRequired,
};

export default connect(null, { markReadNotification, clearNotification })(
  NotificationItem
);

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Notifications = (props) => {
  return (
    <Fragment>
      <div className='arrow-nav'></div>
      <div className='arrow-nav2'></div>
      <ul className='notifications'>
        <li>
          Notifications
          <span>
            <span>Mark All as Read</span> <span>Clear All</span>
          </span>
        </li>
        <li>
          <a href='#!'>
            <img
              src='/uploads/avatars/avatar_5ec638516e9c3c4f08f7f468_1590144397116.png'
              alt='avatar'
            />
            <span>
              <p>Tuong liked on your post</p>
              <span>2 hours ago</span>
            </span>
            <img
              src='/uploads/photos/photo_5ec638516e9c3c4f08f7f468_1590138397714.jpg'
              alt='your post'
            />
            <div className='actions'>
              <i title='Clear This' class='fas fa-times'></i>
              <i title='Mark as Read' class='far fa-dot-circle'></i>
            </div>
          </a>
        </li>
      </ul>
    </Fragment>
  );
};

Notifications.propTypes = {};

export default Notifications;

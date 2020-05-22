import React from 'react';
import PropTypes from 'prop-types';

const Feeds = (props) => {
  return (
    <main id='feed'>
      <div className='photo'>
        <header className='photo__header'>
          <img src='images/avatar.jpg' alt='avatar' className='photo__avatar' />
          <div className='photo__user-info'>
            <span className='photo__author'>inthetiger</span>
            <span className='photo__location'>Bestechung</span>
          </div>
        </header>
        <img src='images/feedPhoto.jpg' alt='feed' />
        <div className='photo__info'>
          <div className='photo__actions'>
            <span className='photo__action'>
              <i className='fas fa-heart fa-lg'></i>
            </span>
            <span className='photo__action'>
              <i className='fas fa-comment fa-lg'></i>
            </span>
          </div>
          <span className='photo__likes'>45 likes</span>
          <ul className='photo__comments'>
            <li className='photo__comment'>
              <span className='photo__comment-author'>serranoarevalo</span> love
              this!
            </li>
            <li className='photo__comment'>
              <span className='photo__comment-author'>serranoarevalo</span> love
              this!
            </li>
            <li className='photo__comment'>
              <span className='photo__comment-author'>serranoarevalo</span> love
              this!
            </li>
            <li className='photo__comment'>
              <span className='photo__comment-author'>serranoarevalo</span> love
              this!
            </li>
          </ul>
          <span className='photo__time-ago'>2 hours ago</span>
          <div className='photo__add-comment-container'>
            <textarea name='comment' placeholder='Add a comment...'></textarea>
            <i className='fas fa-ellipsis-h'></i>
          </div>
        </div>
      </div>
      <div className='photo'>
        <header className='photo__header'>
          <img src='images/avatar.jpg' alt='avatar' className='photo__avatar' />
          <div className='photo__user-info'>
            <span className='photo__author'>inthetiger</span>
            <span className='photo__location'>Bestechung</span>
          </div>
        </header>
        <img src='images/feedPhoto.jpg' alt='feed' />
        <div className='photo__info'>
          <div className='photo__actions'>
            <span className='photo__action'>
              <i className='fas fa-heart fa-lg'></i>
            </span>
            <span className='photo__action'>
              <i className='fas fa-comment fa-lg'></i>
            </span>
          </div>
          <span className='photo__likes'>45 likes</span>
          <ul className='photo__comments'>
            <li className='photo__comment'>
              <span className='photo__comment-author'>serranoarevalo</span> love
              this!
            </li>
            <li className='photo__comment'>
              <span className='photo__comment-author'>serranoarevalo</span> love
              this!
            </li>
            <li className='photo__comment'>
              <span className='photo__comment-author'>serranoarevalo</span> love
              this!
            </li>
            <li className='photo__comment'>
              <span className='photo__comment-author'>serranoarevalo</span> love
              this!
            </li>
          </ul>
          <span className='photo__time-ago'>2 hours ago</span>
          <div className='photo__add-comment-container'>
            <textarea name='comment' placeholder='Add a comment...'></textarea>
            <i className='fas fa-ellipsis-h'></i>
          </div>
        </div>
      </div>
    </main>
  );
};

Feeds.propTypes = {};

export default Feeds;

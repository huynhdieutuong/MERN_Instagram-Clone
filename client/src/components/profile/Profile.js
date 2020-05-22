import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Profile = (props) => {
  return (
    <main id='profile'>
      <header className='profile__header'>
        <div className='profile__column'>
          <img src='images/avatar.jpg' alt='avatar' />
        </div>
        <div className='profile__column'>
          <div className='profile__title'>
            <h3 className='profile__username'>serranoarevalo</h3>
            <Link to='/edit-profile'>Edit profile</Link>
            <i className='fas fa-cog fa-lg'></i>
          </div>
          <ul className='profile__stats'>
            <li className='profile__stat'>
              <span className='stat__number'>333</span> posts
            </li>
            <li className='profile__stat'>
              <span className='stat__number'>1234</span> followers
            </li>
            <li className='profile__stat'>
              <span className='stat__number'>36</span> following
            </li>
          </ul>
          <p className='profile__bio'>
            <span className='profile__full-name'>Nicolás Serrano Arévalo</span>{' '}
            Doing whatever and eating Pho Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Ducimus suscipit praesentium eveniet
            quibusdam ipsam omnis fugit. Tempore voluptates ratione recusandae
            natus illo perspiciatis suscipit, odio consequuntur quasi obcaecati
            minus! Omnis.
            <a href='#!'>serranoarevalo.com</a>
          </p>
        </div>
      </header>
      <section className='profile__photos'>
        <div className='profile__photo'>
          <img src='images/feedPhoto.jpg' alt='feed' />
          <div className='profile__photo-overlay'>
            <span className='overlay__item'>
              <i className='fas fa-heart'></i>
              486
            </span>
            <span className='overlay__item'>
              <i className='fas fa-comment'></i>
              344
            </span>
          </div>
        </div>
        <div className='profile__photo'>
          <img src='images/feedPhoto.jpg' alt='feed' />
          <div className='profile__photo-overlay'>
            <span className='overlay__item'>
              <i className='fas fa-heart'></i>
              486
            </span>
            <span className='overlay__item'>
              <i className='fas fa-comment'></i>
              344
            </span>
          </div>
        </div>
        <div className='profile__photo'>
          <img src='images/feedPhoto.jpg' alt='feed' />
          <div className='profile__photo-overlay'>
            <span className='overlay__item'>
              <i className='fas fa-heart'></i>
              486
            </span>
            <span className='overlay__item'>
              <i className='fas fa-comment'></i>
              344
            </span>
          </div>
        </div>
        <div className='profile__photo'>
          <img src='images/feedPhoto.jpg' alt='feed' />
          <div className='profile__photo-overlay'>
            <span className='overlay__item'>
              <i className='fas fa-heart'></i>
              486
            </span>
            <span className='overlay__item'>
              <i className='fas fa-comment'></i>
              344
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

Profile.propTypes = {};

export default Profile;

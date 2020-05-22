import React from 'react';

import NoPost from '../../images/no-post.jpg';
import IosLogo from '../../images/ios.png';
import AndroidLogo from '../../images/android.png';

const ProfileNoPost = (props) => {
  return (
    <div className='no-post'>
      <div className='left'>
        <img src={NoPost} alt='no post' />
      </div>
      <div className='right'>
        <h2>Start capturing and sharing your moments.</h2>
        <p>Get the app to share your first photo or video.</p>
        <div className='login__appstores'>
          <img
            src={IosLogo}
            className='login__appstore'
            alt='Apple appstore logo'
            title='Apple appstore logo'
          />
          <img
            src={AndroidLogo}
            className='login__appstore'
            alt='Android appstore logo'
            title='Android appstore logo'
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileNoPost;

import React from 'react';

import PhoneImage from '../../images/phoneImage.png';
import IosLogo from '../../images/ios.png';
import AndroidLogo from '../../images/android.png';

const LandingLayout = ({ children }) => (
  <main id='login'>
    <div className='login__column'>
      <img src={PhoneImage} alt='phone' className='login__phone' />
    </div>
    <div className='login__column'>
      {children}
      <div className='login__box--transparent'>
        <span>Get the app.</span>
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
  </main>
);

export default LandingLayout;

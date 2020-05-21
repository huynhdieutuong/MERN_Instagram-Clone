import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PhoneImage from '../../images/phoneImage.png';
import IosLogo from '../../images/ios.png';
import AndroidLogo from '../../images/android.png';

import Login from '../auth/Login';
import Register from '../auth/Register';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';

const Landing = (props) => {
  return (
    <main id='login'>
      <div className='login__column'>
        <img src={PhoneImage} alt='phone' className='login__phone' />
      </div>
      <div className='login__column'>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/forgotpassword' component={ForgotPassword} />
          <Route exact path='/resetpassword/:token' component={ResetPassword} />
        </Switch>
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
};

export default Landing;

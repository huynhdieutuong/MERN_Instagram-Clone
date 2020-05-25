import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';

// Components
import Footer from './components/layout/Footer';
import Alerts from './components/layout/Alerts';
import Confirmation from './components/auth/Confirmation';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Profile from './components/profile/Profile';
import Feeds from './components/feed/Feeds';
import SinglePost from './components/feed/SinglePost';
import EditProfile from './components/profile/EditProfile';
import ChangePassword from './components/profile/ChangePassword';
import ChangeEmail from './components/profile/ChangeEmail';
import NotVerify from './components/auth/NotVerify';
import NotFound from './components/layout/NotFound';

// Layout Routes
import LandingLayoutRoute from './components/routing/LandingLayoutRoute';
import MainLayoutRoute from './components/routing/MainLayoutRoute';
import EditProfileLayoutRoute from './components/routing/EditProfileLayoutRoute';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Alerts />

        <Switch>
          <LandingLayoutRoute exact path='/login' component={Login} />
          <LandingLayoutRoute exact path='/register' component={Register} />
          <LandingLayoutRoute
            exact
            path='/forgotpassword'
            component={ForgotPassword}
          />
          <LandingLayoutRoute
            exact
            path='/resetpassword/:token'
            component={ResetPassword}
          />
          <Route exact path='/confirmation/:token' component={Confirmation} />
          <MainLayoutRoute exact path='/' component={Feeds} />
          <MainLayoutRoute exact path='/profile' component={Profile} />
          <MainLayoutRoute exact path='/posts/:id' component={SinglePost} />
          <EditProfileLayoutRoute
            exact
            path='/edit-profile'
            component={EditProfile}
          />
          <EditProfileLayoutRoute
            exact
            path='/change-password'
            component={ChangePassword}
          />
          <EditProfileLayoutRoute
            exact
            path='/change-email'
            component={ChangeEmail}
          />
          <Route exact path='/not-verify' component={NotVerify} />
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </Router>
    </Provider>
  );
};

export default App;

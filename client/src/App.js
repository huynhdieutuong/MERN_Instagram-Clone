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
import NotFound from './components/layout/NotFound';

// Layout Routes
import LandingLayoutRoute from './components/routing/LandingLayoutRoute';
import MainLayoutRoute from './components/routing/MainLayoutRoute';

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
          <Route component={NotFound} />
        </Switch>

        <Footer />
      </Router>
    </Provider>
  );
};

export default App;

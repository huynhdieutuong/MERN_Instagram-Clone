import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Alerts from './components/layout/Alerts';
import Confirmation from './components/auth/Confirmation';

const App = () => (
  <Provider store={store}>
    <Router>
      <Alerts />

      <Switch>
        <Route exact path='/confirmation/:token' component={Confirmation} />
        <Route component={Landing} />
      </Switch>

      <Footer />
    </Router>
  </Provider>
);

export default App;

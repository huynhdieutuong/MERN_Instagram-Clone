import React from 'react';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => <Provider store={store}></Provider>;

export default App;

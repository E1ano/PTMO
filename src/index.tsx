import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {App} from './view/components/App';

const RootApp: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;

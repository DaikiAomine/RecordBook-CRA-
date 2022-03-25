import React from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';

import LoginPage from './pages/login/login';

const App = () => {
  return (
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
};

export default App;
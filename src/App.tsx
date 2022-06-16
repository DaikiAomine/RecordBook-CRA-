import React from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';

// import LoginPage from './pages/login/login';
import Home from './pages/SmartMeeting/Home';

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
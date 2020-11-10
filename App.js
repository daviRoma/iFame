/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import 'react-native-paper';
import React from 'react';
import RootNavigator from './src/navigators/RootNavigator';
import { Provider } from 'react-redux';
import store from './src/app/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;

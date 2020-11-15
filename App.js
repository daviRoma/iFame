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
import { ThemeProvider } from 'react-native-elements';
import theme from './src/common/theme';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RootNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;

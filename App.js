/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import 'react-native-paper';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import store from './src/app/store';
import theme, { SECONDARY_COLOR } from './src/common/theme';
import RootNavigator from './src/navigators/RootNavigator';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={SECONDARY_COLOR} />
        <RootNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;

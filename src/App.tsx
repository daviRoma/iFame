/* eslint-disable prettier/prettier */
import React from 'react';
import useDispatch from 'react-redux';
import firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen';
import SafeAreaProvider from 'react-native-safe-area-context';

import { authLogin, authLogout } from './actions/AuthAction';
import { User } from './models/user.model';
// import RootNavigator from './navigator/RootNavigator';

const firebaseConfig = {
  apiKey: 'AIzaSyDSduPtbGhl6xm1RgzaIsSNheaYKbARqUc',
  authDomain: 'awesome-project-8c366.firebaseapp.com',
  databaseURL: 'https://awesome-project-8c366.firebaseio.com',
  projectId: 'awesome-project-8c366',
  storageBucket: 'awesome-project-8c366.appspot.com',
  messagingSenderId: '977115613335',
  appId: '1:977115613335:web:7f3cc622eb63db80fdc1d2',
};

class BackgroundService extends React.Component {
  constructor(props: any) {
    super(props);
    firebase.initializeApp(firebaseConfig);
    SplashScreen.hide();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user: User) => { });
  }
  render() {
    return null;
  }
}

const App = () => {
  const dispatch = useDispatch();
  return (
    <>
      <BackgroundService
        userLogin={(user) => {
          dispatch(authLogin(user));
        }}
        userLogout={() => {
          dispatch(authLogout());
        }}
      />
      {/*<SafeAreaView style={styles.container}>*/}
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
      {/*</SafeAreaView>*/}
    </>
  );
};

export default App;

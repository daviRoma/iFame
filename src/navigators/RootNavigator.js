import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import LoginPage from '../pages/LoginPage';
import NewEventPage from '../pages/NewEventPage';
import SignInPage from '../pages/SignInPage';
import SingleEventPage from '../pages/SingleEventPage';
import UpdateEventPage from '../pages/UpdateEventPage';
import * as Routes from '../routes';
import TabPagesNavigator from './TabPagesNavigator';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { clearUserInfo, getUserInfo } from '../features/userSlice';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const { isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const sub = auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(getUserInfo());
      } else {
        dispatch(clearUserInfo());
      }
    });
    return sub;
  }, []);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {!isLogged ? (
          <>
            <RootStack.Screen
              name={Routes.LOGIN}
              component={LoginPage}
              options={() => {
                return {
                  title: 'Login',
                };
              }}
            />
            <RootStack.Screen
              name={Routes.SIGNIN}
              component={SignInPage}
              options={() => {
                return {
                  title: 'Sign Up',
                };
              }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name={Routes.TAB_PAGES}
              component={TabPagesNavigator}
            />
            <RootStack.Screen
              name={Routes.NEW_EVENT}
              component={NewEventPage}
              options={() => {
                return {
                  title: 'Create Event',
                };
              }}
            />
            <RootStack.Screen
              name={Routes.SINGLE_EVENT}
              component={SingleEventPage}
              options={() => {
                return {
                  title: 'Event Detail',
                };
              }}
            />
            <RootStack.Screen
              name={Routes.UPDATE_EVENT}
              component={UpdateEventPage}
              options={() => {
                return {
                  title: 'Update Event',
                };
              }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

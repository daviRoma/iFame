import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import LoginPage from '../pages/LoginPage';
import NewEventPage from '../pages/NewEventPage';
import SignInPage from '../pages/SignInPage';
import SingleEventPage from '../pages/SingleEventPage';
import UpdateEventPage from '../pages/UpdateEventPage';
import * as Routes from '../routes';
import TabPagesNavigator from './TabPagesNavigator';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { clearUserInfo, getUserInfo } from '../features/user/userSlice';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const { user, loading } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    let firstCall = true;
    const sub = auth().onAuthStateChanged((loggedUser) => {
      if (!firstCall) {
        if (loggedUser) {
          const unsubscribe = dispatch(getUserInfo());
          return unsubscribe;
        } else {
          dispatch(clearUserInfo());
        }
      }
      firstCall = false;
    });
    return sub;
  }, []);

  return (
    <NavigationContainer>
      {loading ? (
        <CustomActivityIndicator />
      ) : (
        <RootStack.Navigator>
          {!user ? (
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
                options={{
                  headerShown: false,
                }}
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
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;

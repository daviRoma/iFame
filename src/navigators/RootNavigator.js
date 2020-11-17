import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import LoginPage from '../pages/LoginPage';
import NewEventFirstPage from '../features/eventCreation/NewEventFirstPage';
import NewEventRestaurantPage from '../features/eventCreation/NewEventRestaurantPage';
import SignInPage from '../pages/SignInPage';
import SingleEventPage from '../pages/SingleEventPage';
import UpdateEventPage from '../pages/UpdateEventPage';
import * as Routes from '../routes';
import TabPagesNavigator from './TabPagesNavigator';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { clearUserInfo, getUserInfo } from '../features/user/userSlice';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import RestaurantDetail from '../features/restaurants/RestaurantDetail';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const { user, loading } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    let firstCall = true;
    const sub = auth().onIdTokenChanged((loggedUser) => {
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
                    title: 'Registrazione',
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
                name={Routes.NEW_EVENT_FIRST}
                component={NewEventFirstPage}
                options={() => {
                  return {
                    title: 'Nuovo Evento',
                  };
                }}
              />
              <RootStack.Screen
                name={Routes.NEW_EVENT_SECOND}
                component={NewEventRestaurantPage}
                options={() => {
                  return {
                    title: 'Seleziona ristorante',
                  };
                }}
              />
              <RootStack.Screen
                name={Routes.RESTAURANT_DETAIL}
                component={RestaurantDetail}
                options={() => {
                  return {
                    title: 'Dettaglio ristorante',
                  };
                }}
              />
              <RootStack.Screen
                name={Routes.SINGLE_EVENT}
                component={SingleEventPage}
                options={() => {
                  return {
                    title: 'Dettaglio Evento',
                  };
                }}
              />
              <RootStack.Screen
                name={Routes.UPDATE_EVENT}
                component={UpdateEventPage}
                options={() => {
                  return {
                    title: 'Aggiorna Evento',
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

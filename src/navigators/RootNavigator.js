import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginPage from '../pages/LoginPage';
import NewEventFirstPage from '../features/eventCreation/NewEventFirstPage';
import NewEventRestaurantPage from '../features/eventCreation/NewEventRestaurantPage';
import SignInPage from '../pages/SignInPage';
import UpdateEventPage from '../pages/UpdateEventPage';
import * as Routes from '../routes';
import TabPagesNavigator from './TabPagesNavigator';
import { useSelector } from 'react-redux';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import RestaurantDetail from '../features/restaurants/RestaurantDetail';
import MyEventSinglePage from '../pages/MyEventSinglePage';
import EventDetailPage from '../pages/EventDetailPage';
import { useLogin } from '../hooks';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const { user, loading } = useSelector((state) => state.loggedUser);
  useLogin();

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
                  title: 'Main Page',
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
                name={Routes.MY_EVENT_SINGLE_PAGE}
                component={MyEventSinglePage}
                options={() => {
                  return {
                    title: 'Dettaglio Evento',
                  };
                }}
              />
              <RootStack.Screen
                name={Routes.SINGLE_EVENT}
                component={EventDetailPage}
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

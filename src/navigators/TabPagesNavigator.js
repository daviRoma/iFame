import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as Routes from '../routes';
import HomePage from '../pages/HomePage';
import EventListPage from '../pages/EventListPage';
import MyEventsPage from '../pages/MyEventsPage';
import ProfilePage from '../pages/ProfilePage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const TabPagesNavigator = () => {
  const TabNavigator = createMaterialBottomTabNavigator();

  return (
    <SafeAreaProvider>
      <TabNavigator.Navigator>
        <TabNavigator.Screen
          name={Routes.HOME}
          component={HomePage}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="home" color={color} size={26} />
            ),
          }}
        />
        <TabNavigator.Screen
          name={Routes.LIST}
          component={EventListPage}
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: ({ color }) => (
              <Feather name="map" color={color} size={24} />
            ),
          }}
        />
        <TabNavigator.Screen
          name={Routes.MY_EVENTS}
          component={MyEventsPage}
          options={{
            tabBarLabel: 'My Events',
            tabBarIcon: ({ color }) => (
              <Feather name="list" color={color} size={24} />
            ),
          }}
        />
        <TabNavigator.Screen
          name={Routes.PROFILE}
          component={ProfilePage}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" color={color} size={24} />
            ),
          }}
        />
      </TabNavigator.Navigator>
    </SafeAreaProvider>
  );
};

export default TabPagesNavigator;

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  CLEAR_COLOR,
  CONTRAST_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from '../common/theme';
import EventListPage from '../pages/EventListPage';
import HomePage from '../pages/HomePage';
import MyEventsPage from '../pages/MyEventsPage';
import ProfilePage from '../pages/ProfilePage';
import * as Routes from '../routes';

const TabPagesNavigator = () => {
  const TabNavigator =
    Platform.OS === 'android'
      ? createMaterialBottomTabNavigator()
      : createMaterialTopTabNavigator();

  return (
    <SafeAreaProvider style={styles.pageContainer}>
      <TabNavigator.Navigator
        barStyle={{
          backgroundColor: SECONDARY_COLOR,
        }}
        tabBarOptions={{
          style: { backgroundColor: SECONDARY_COLOR },
          activeTintColor: CLEAR_COLOR,
          inactiveTintColor: CLEAR_COLOR,
          indicatorStyle: { backgroundColor: CONTRAST_COLOR },
        }}>
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

const styles = StyleSheet.create({
  pageContainer: {
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
});

export default TabPagesNavigator;

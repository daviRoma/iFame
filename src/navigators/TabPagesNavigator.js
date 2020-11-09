import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as Routes from '../routes';
import HomePage from '../pages/HomePage';
import EventListPage from '../pages/EventListPage';
import MyEventsPage from '../pages/MyEventsPage';
import ProfilePage from '../pages/ProfilePage';

const TabPagesNavigator = () => {
  const TabNavigator = createMaterialBottomTabNavigator();

  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen name={Routes.HOME} component={HomePage} />
      <TabNavigator.Screen name={Routes.LIST} component={EventListPage} />
      <TabNavigator.Screen name={Routes.MY_EVENTS} component={MyEventsPage} />
      <TabNavigator.Screen name={Routes.PROFILE} component={ProfilePage} />
    </TabNavigator.Navigator>
  );
};

export default TabPagesNavigator;

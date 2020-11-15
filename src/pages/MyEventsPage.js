import React, { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import * as Routes from '../routes';

import { EventItem } from '../components';

import {
  getAllUserEvents,
  selectAllEvents,
  selectEventLoading,
} from '../features/eventSlice';

export default function MyEventsPage({ navigation }) {
  const userEventList = useSelector(selectAllEvents);
  const isLoading = useSelector(selectEventLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserEvents(auth().currentUser.uid));
  }, []);


  if (isLoading || userEventList === null) {
    return (
      <View style={[styles.activityContainer, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (!userEventList.length) {
    return (
      <View style={styles.pageContainer}>
        <Text>No event found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.pageContainer, { paddingBottom: 10 }]}>
      <ScrollView style={styles.sectionOne}>
        {userEventList.map((item, i) => (
          <EventItem
            item={item}
            onPress={() => {
              navigation.navigate(Routes.SINGLE_EVENT, { id: item.id });
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
  
}

const styles = {
  pageContainer: {
    flex: 1,
  },
  noElemContainer: {
    text: {
      align: 'center',
      fontSize: 17,
    },
  },
  sectionOne: {
    flex: 1,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
};

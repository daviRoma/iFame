import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-native-elements';
import * as Routes from '../routes';
import { useFocusEffect } from '@react-navigation/native';

import EventItem from '../components/EventItem';

import {
  getAllEvents,
  selectAllEvents,
  selectEventLoading,
} from '../features/events/eventSlice';
import { FlatList } from 'react-native-gesture-handler';

export default function EventListPage({ navigation }) {
  const eventList = useSelector(selectAllEvents);
  const isLoading = useSelector(selectEventLoading);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllEvents({ location: 'Roma' }));
    }, [dispatch]),
  );

  if (isLoading || eventList === null) {
    return (
      <View style={[styles.activityContainer, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (!eventList.length) {
    return (
      <View style={styles.pageContainer}>
        <Text>No event found</Text>
      </View>
    );
  }

  // if events found
  return (
    <View style={[styles.pageContainer, { paddingBottom: 10 }]}>
      <FlatList
        style={styles.sectionOne}
        data={eventList}
        renderItem={({ item }) => {
          return (
            <EventItem
              item={item}
              onPress={() => {
                navigation.navigate(Routes.SINGLE_EVENT, { id: item.id });
              }}
            />
          );
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.sectionTwo}>
        <Card containerStyle={{ margin: 0 }}>
          <Card.Title>MAP</Card.Title>
          <Card.Divider />
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  sectionOne: {
    flex: 1,
  },
  sectionTwo: {
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

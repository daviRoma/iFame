import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-native-elements';
import * as Routes from '../routes';

import { EventItem } from '../components';

import {
  getAllEvents,
  selectAllEvents,
  selectEventLoading,
} from '../features/eventSlice';

export default function EventListPage({ navigation }) {
  const eventList = useSelector(selectAllEvents);
  const isLoading = useSelector(selectEventLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents({ location: 'Roma' }));
  }, []);

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
      <ScrollView style={styles.sectionOne}>
        {eventList.map((item, i) => (
          <EventItem
            item={item}
            onPress={() => {
              navigation.navigate(Routes.SINGLE_EVENT, { id: item.id });
            }}
          />
        ))}
      </ScrollView>

      <View style={styles.sectionTwo}>
        <Card containerStyle={{ margin: 0 }}>
          <Card.Title>MAP</Card.Title>
          <Card.Divider />
        </Card>
      </View>
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
};

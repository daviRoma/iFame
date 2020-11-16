import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { EventItem } from '../components';
import {
  getAllUserEvents,
  selectAllEvents,
  selectEventLoading,
} from '../features/events/eventSlice';
import * as Routes from '../routes';

export default function MyEventsPage({ navigation }) {
  const userEventList = useSelector(selectAllEvents);
  const isLoading = useSelector(selectEventLoading);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllUserEvents(auth().currentUser.uid));
    }, []),
  );

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
      <FlatList
        style={styles.sectionOne}
        data={userEventList}
        keyExtractor={(item) => item.id}
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
      />
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

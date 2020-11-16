import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { EventItem, FilterBar } from '../components';
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
      <SafeAreaView style={[styles.activityContainer, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  } else if (!userEventList.length) {
    return (
      <SafeAreaView style={styles.pageContainer}>
        <Text style={styles.noElemContainer}>No event found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.pageContainer, { paddingBottom: 10 }]}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  noElemContainer: {
    textAlign: 'center',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
});

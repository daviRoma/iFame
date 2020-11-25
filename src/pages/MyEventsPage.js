import auth from '@react-native-firebase/auth';
import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomActivityIndicator,
  ErrorMessage,
  EventItem,
  FloatingButton,
} from '../components';
import { getAllUserEvents } from '../features/myEvents/myEventsSlice';
import * as Routes from '../routes';

export default function MyEventsPage({ navigation }) {
  const { myEvents, loading, error } = useSelector((state) => state.myEvents);
  const dispatch = useDispatch();

  useEffect(() => {
    const sub = dispatch(getAllUserEvents(auth().currentUser.uid));
    return sub;
  }, [dispatch]);

  if (loading || myEvents === null) {
    return <CustomActivityIndicator />;
  } else if (!myEvents.length) {
    return (
      <SafeAreaView style={styles.noElemContainer}>
        <Text style={styles.noElemText}>No event found</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <SafeAreaView style={[styles.pageContainer, { paddingBottom: 10 }]}>
      <FlatList
        style={styles.sectionOne}
        data={myEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <EventItem
              item={item}
              onPress={() => {
                navigation.navigate(Routes.MY_EVENT_SINGLE_PAGE, {
                  id: item.id,
                });
              }}
            />
          );
        }}
      />
      <FloatingButton
        clickHandler={() => {
          navigation.navigate(Routes.NEW_EVENT_FIRST);
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
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noElemText: {
    fontSize: 22,
    marginVertical: 10,
    padding: 10,
    color: '#898989',
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

import auth from '@react-native-firebase/auth';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomActivityIndicator,
  ErrorMessage,
  EventItem,
} from '../components';
import { getAllUserEvents } from '../features/myEvents/myEventsSlice';
import * as Routes from '../routes';

export default function MyEventsPage({ navigation }) {
  const { myEvents, loading, error } = useSelector((state) => state.myEvents);
  const dispatch = useDispatch();

  useEffect(() => {
    const sub = dispatch(getAllUserEvents(auth().currentUser.uid));
    return sub;
  }, []);

  if (loading || myEvents === null) {
    return <CustomActivityIndicator />;
  } else if (!myEvents.length) {
    return (
      <View style={styles.pageContainer}>
        <Text>No event found</Text>
      </View>
    );
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <View style={[styles.pageContainer, { paddingBottom: 10 }]}>
      <FlatList
        style={styles.sectionOne}
        data={myEvents}
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

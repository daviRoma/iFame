import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, StyleSheet, View, Text, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Icon } from 'react-native-elements';

import { FloatingButton, EventList } from '../components';
import FoodPrefsModal from '../features/foodCategories/FoodPrefsModal';
import {
  loadFoodPref,
  storeInformationFail,
  storeUserPosition,
} from '../features/user/userSlice';
import {
  getHomeEvents,
  selectAllEvents,
  selectEventLoading,
} from '../features/events/eventSlice';
import {
  getDistances,
  getReverseGeocoding,
} from '../features/google/googlePosition';
import { useGeolocation, useEventParticipation } from '../hooks';
import * as Routes from '../routes';
import { CONTRAST_COLOR } from '../common/theme';

export default function HomePage({ navigation }) {
  const { loading, user } = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const eventList = useSelector(selectAllEvents);
  const isLoading = useSelector(selectEventLoading);

  const [eventsParticipation, loadEvents] = useEventParticipation({
    participation: auth().currentUser ? auth().currentUser.uid : null,
    timestamp: Date.now(),
  });
  const [visible, setVisible] = useState(true);
  const [preferences, setPreferencies] = useState(user ? user.preferences : []);

  useGeolocation(
    (pos) => dispatchEvents(pos),
    (error) => dispatch(storeInformationFail(error)),
  );

  const dispatchEvents = (pos) => {
    let coords = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    };

    dispatch(storeUserPosition(coords));

    getReverseGeocoding(coords).then((resp) => {
      dispatch(
        getHomeEvents({
          coordinates: getDistances(50, coords.latitude, coords.longitude),
          preferences: user.preferences.map((pref) => pref.key),
          timestamp: Date.now(),
        }),
      );
    });
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator size={30} />
      ) : (
        <SafeAreaView style={styles.pageContainer}>
          {user && !user.preferences.length ? (
            <FoodPrefsModal
              visible={visible}
              onClose={() => {
                dispatch(loadFoodPref(preferences));
              }}
              setVisible={setVisible}
              foodPref={preferences}
              setFoodPref={setPreferencies}
            />
          ) : null}
          <View style={styles.sectionOne}>
            <Card containerStyle={{ margin: 0 }}>
              <Card.Title h4>Eventi a cui partecipi</Card.Title>
              <Card.Divider />
              <EventList
                loading={loadEvents}
                events={eventsParticipation}
                navigation={navigation}
              />
            </Card>
          </View>
          <View style={styles.sectionTwo}>
            <Card containerStyle={{ margin: 0 }}>
              <Card.Title h4 style={styles.cardTitle}>
                <Text>Scelti per te</Text>
                <Icon style={{marginLeft:9}} name="star" type="font-awesome" color={CONTRAST_COLOR} />
              </Card.Title>
              <Card.Divider />
              <EventList
                loading={isLoading}
                events={eventList.filter(
                  (evt) =>
                    preferences.find((pref) => pref.key === evt.category) !==
                    undefined,
                )}
                navigation={navigation}
              />
            </Card>
          </View>
          <FloatingButton
            clickHandler={() => {
              navigation.navigate(Routes.NEW_EVENT_FIRST);
            }}
          />
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  sectionOne: {
    marginTop: 0,
  },
  sectionTwo: {
    marginTop: 0,
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
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
import { useGeolocation } from '../hooks';
import * as Routes from '../routes';

export default function HomePage({ navigation }) {
  const { loading, user } = useSelector((state) => state.loggedUser);

  const dispatch = useDispatch();

  const eventList = useSelector(selectAllEvents);
  const isLoading = useSelector(selectEventLoading);

  const [visible, setVisible] = useState(true);
  const [preferences, setPreferencies] = useState(user.preferences);

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
          preferences: preferences.map((pref) => pref.key),
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
        <SafeAreaView style={{ flex: 1 }}>
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
          <EventList
            loading={isLoading}
            events={eventList}
            navigation={navigation}
          />
          <View style={styles.sectionTwo}>
            <Card containerStyle={{ margin: 0 }}>
              <Card.Title style={styles.cardTitle}>
                <Text>For You</Text>
                <Icon
                  style={{ marginLeft: 10 }}
                  name="star"
                  type="font-awesome"
                  color="#ffcc00"
                />
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
  sectionOne: {
    flex: 1,
    marginTop: 0,
  },
  sectionTwo: {
    flex: 1,
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: 27,
  },
});

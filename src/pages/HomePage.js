import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, StyleSheet, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-elements';

import { FlatList } from 'react-native-gesture-handler';
import {
  FloatingButton,
  EventItem,
  CustomActivityIndicator,
} from '../components';
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
  const { loading, user, position } = useSelector((state) => state.loggedUser);

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
          <View style={styles.sectionOne}>
            {isLoading || eventList === null ? (
              <SafeAreaView
                style={[styles.activityContainer, styles.horizontal]}>
                <CustomActivityIndicator />
              </SafeAreaView>
            ) : (
              <FlatList
                data={eventList}
                renderItem={({ item }) => {
                  return (
                    <EventItem
                      item={item}
                      onPress={() => {
                        navigation.navigate(Routes.SINGLE_EVENT, {
                          id: item.id,
                        });
                      }}
                    />
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
          <View style={styles.sectionTwo}>
            <Card containerStyle={{ margin: 0 }}>
              <Card.Title>For You</Card.Title>
              <Card.Divider />
              {isLoading || eventList === null ? (
                <SafeAreaView
                  style={[styles.activityContainer, styles.horizontal]}>
                  <CustomActivityIndicator />
                </SafeAreaView>
              ) : (
                <FlatList
                  data={eventList.filter(
                    (evt) =>
                      preferences.find((pref) => pref.key === evt.category) !== undefined,
                  )}
                  renderItem={({ item }) => {
                    return (
                      <EventItem
                        item={item}
                        onPress={() => {
                          navigation.navigate(Routes.SINGLE_EVENT, {
                            id: item.id,
                          });
                        }}
                      />
                    );
                  }}
                  keyExtractor={(item) => item.id}
                />
              )}
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
});

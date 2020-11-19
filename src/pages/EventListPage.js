import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Routes from '../routes';

import {
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Button, Card, Overlay, Slider } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { EventItem, FilterBar } from '../components';
import {
  getAllEvents,
  selectAllEvents,
  selectEventLoading,
} from '../features/events/eventSlice';

import {
  getReverseGeocoding,
  getMyPosition,
  getDistances,
} from '../features/google/googlePosition';
import { dateFormat } from '../utils/index';
import { selectState } from '../features/eventCreation/eventCreationSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EventListPage({ navigation }) {
  const { user } = useSelector((state) => state.loggedUser);

  const state = useSelector(selectState);
  const eventList = useSelector(selectAllEvents);
  const isLoading = useSelector(selectEventLoading);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(null);
  const [visible, setVisible] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [rangeValue, setRangeValue] = useState(30);
  const [rangeValueDisplayed, setRangeValueDisplayed] = useState(30);
  const [location, setLocation] = useState(state.location);
  const [preferences, setPreferencies] = useState(user.preferences);

  const toggleRangeOverlay = () => {
    rangeValueChange(rangeValueDisplayed);
    setVisible(!visible);
  };

  const toggleCalendarOverlay = () => {
    setCalendar(!calendar);
  };

  const rangeConfirm = () => {
    setRangeValueDisplayed(rangeValue);
    toggleRangeOverlay();
    setTimeout(() => {
      dispatchEvents(startDate);
    }, 400);
  };

  const rangeValueChange = (val) => {
    setRangeValue(val);
  };

  const onDateChange = (date) => {
    toggleCalendarOverlay(false);
    setStartDate(date);
    dispatchEvents(dateFormat(date));
  };

  const dispatchEvents = (date) => {
    getReverseGeocoding().then((resp) => {
      setLocation(resp.location);

      getMyPosition().then((info) => {
        let coordinates = getDistances(
          rangeValueDisplayed,
          info.coords.latitude,
          info.coords.longitude,
        );
        dispatch(
          getAllEvents({
            coordinates,
            date,
            preferences: preferences.map((pref) => pref.title),
          }),
        );
      });
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      // Get location
      dispatchEvents(null);
    }, [dispatch]),
  );

  if (isLoading || eventList === null) {
    return (
      <SafeAreaView style={[styles.activityContainer, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  // if events found
  return (
    <SafeAreaView style={[styles.pageContainer, { paddingBottom: 10 }]}>
      <FilterBar
        location={`${rangeValueDisplayed}km da ${location}`}
        onPressFiler={toggleRangeOverlay}
        onPressDate={toggleCalendarOverlay}
      />
      {eventList != null && !eventList.length ? (
        <View style={styles.noElemContainer}>
          <Text style={styles.noElemText}>No event found</Text>
        </View>
      ) : (
        <View style={styles.sectionOne}>
          <FlatList
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
        </View>
      )}

      <View style={styles.sectionTwo}>
        <Card containerStyle={{ margin: 0 }}>
          <Card.Title>MAP</Card.Title>
          <Card.Divider />
        </Card>
      </View>

      <Overlay isVisible={visible} onBackdropPress={toggleRangeOverlay}>
        <View>
          <Text style={styles.overlayHeader}>Cerca vicino a te</Text>
          <View style={styles.overlayContainer}>
            <Slider
              style={{ flex: 0 }}
              value={rangeValue}
              maximumValue={30}
              minimumValue={5}
              step={5}
              onValueChange={rangeValueChange}
              trackStyle={styles.trackStyle}
              thumbStyle={styles.thumbStyle}
              minimumTrackTintColor={'#32a852'}
              maximumTrackTintColor={'#D8D8D8'}
            />
            <Text
              style={{ textAlign: 'center', fontSize: 15, color: '#575757' }}>
              {rangeValue} Km
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button title="Confirm" type="clear" onPress={rangeConfirm} />
          </View>
        </View>
      </Overlay>

      <Overlay isVisible={calendar} onBackdropPress={toggleCalendarOverlay}>
        <View style={styles.overlayCalendarContainer}>
          <CalendarPicker onDateChange={onDateChange} />
        </View>
      </Overlay>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  sectionOne: {
    flex: 1,
    marginTop: 0,
  },
  sectionTwo: {
    flex: 1,
  },
  noElemContainer: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noElemText: {
    fontSize: 20,
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
  overlayContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    height: 180,
    width: windowWidth / 2 + 30,
    paddingHorizontal: 15,
  },
  overlayCalendarContainer: {
    justifyContent: 'center',
    height: windowHeight / 3 + 20,
    width: windowWidth - 35,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  overlayHeader: {
    fontSize: 17,
    fontWeight: '700',
    color: '#575757',
  },
  trackStyle: {
    height: 4,
    borderRadius: 6,
    backgroundColor: '#32a852',
  },
  thumbStyle: {
    height: 16,
    width: 16,
    backgroundColor: '#dedede',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

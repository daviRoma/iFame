import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Overlay, Slider, Button } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

import * as Routes from '../routes';

import { EventItem, FilterBar } from '../components';

import {
  getAllEvents,
  selectAllEvents,
  selectEventLoading,
} from '../features/events/eventSlice';
import CalendarPicker from 'react-native-calendar-picker';

import { reverseGeocoding } from '../features/google/googlePosition';
import { dateFormat } from '../utils/index';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EventListPage({ navigation }) {
  const eventList = useSelector(selectAllEvents);
  const isLoading = useSelector(selectEventLoading);
  const dispatch = useDispatch();
  const location = 'Roma';

  const [startDate, setStartDate] = useState(null);
  const [visible, setVisible] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [rangeValue, setRangeValue] = useState(5);

  const toggleRangeOverlay = () => {
    setVisible(!visible);
  };

  const toggleCalendarOverlay = () => {
    setCalendar(!calendar);
  };

  const rangeValueChange = (val) => {
    setRangeValue(val);
  };

  const onDateChange = (date) => {
    toggleCalendarOverlay(false);
    setStartDate(date);
    dispatch(getAllEvents({ date: dateFormat(date) }));
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllEvents({ location: 'Roma' }));
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
        location={`${rangeValue}km da ${location}`}
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
              value={rangeValue}
              maximumValue={30}
              minimumValue={5}
              step={5}
              onValueChange={rangeValueChange}
              trackStyle={styles.trackStyle}
              thumbStyle={styles.thumbStyle}
            />
            <Text
              style={{ textAlign: 'center', fontSize: 15, color: '#575757' }}>
              {rangeValue} Km
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button title="Confirm" type="clear" onPress={toggleRangeOverlay} />
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
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  thumbStyle: {
    height: 25,
    width: 25,
    backgroundColor: '#0ecf04',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

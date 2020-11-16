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
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Overlay, Input, Slider } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

import * as Routes from '../routes';

import { EventItem, FilterBar } from '../components';

import {
  getAllEvents,
  selectAllEvents,
  selectEventLoading,
} from '../features/events/eventSlice';

export default function EventListPage({ navigation }) {
  const eventList = useSelector(selectAllEvents);
  const isLoading = useSelector(selectEventLoading);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [ rangeValue, setRangeValue ] = useState('');

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const rangeValueChange = (val) => {
    setRangeValue(val);
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
  } else if (!eventList.length) {
    return (
      <SafeAreaView style={styles.pageContainer}>
        <Text>No event found</Text>
      </SafeAreaView>
    );
  }

  // if events found
  return (
    <SafeAreaView style={[styles.pageContainer, { paddingBottom: 10 }]}>
      <FilterBar onPressFiler={toggleOverlay} />
      <FlatList
        style={styles.sectionOne}
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

      <View style={styles.sectionTwo}>
        <Card containerStyle={{ margin: 0 }}>
          <Card.Title>MAP</Card.Title>
          <Card.Divider />
        </Card>
      </View>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={{ alignItems: 'stretch', justifyContent: 'center' }}>
          <Slider
            style={styles.overlayContainer}
            value={rangeValue}
            maximumValue={30}
            minimumValue={0}
            step={5}
            onValueChange={rangeValueChange}
            trackStyle={{ height: 10, backgroundColor: 'transparent' }}
            thumbStyle={{
              height: 20,
              width: 20,
              backgroundColor: 'transparent',
            }}
          />
          <Text>Value: {rangeValue}</Text>
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
    height: 150,
    width: 150,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

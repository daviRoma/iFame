import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, Card } from 'react-native-elements';

export default function FilterBar({ location, onPressFiler, onPressDate }) {

  return (
    <View style={styles.barContainer}>
      <Card containerStyle={{ margin: 0, padding: 10 }}>
        <View style={styles.cardContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="map-marker" type="font-awesome" color="#a11405" />
            <Text style={styles.positionContainer}>{location}</Text>
          </View>
          <View style={styles.filterContainer}>
            <Icon
              style={styles.actionIcon}
              name="filter"
              type="font-awesome"
              color="#282829"
              size={18}
              onPress={onPressFiler}
            />
            <Icon
              style={styles.actionIcon}
              name="calendar"
              type="font-awesome"
              color="#282829"
              size={18}
              onPress={onPressDate}
            />
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    height: 60,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  positionContainer: {
    paddingHorizontal: 8,
    fontSize: 15,
    color: '#575757',
    lineHeight: 27,
  },
  filterContainer: {
    borderLeftColor: '#a4a4a6',
    borderLeftWidth: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 3,
  },
  actionIcon: {
    paddingHorizontal: 13,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f7021a',
    padding: 100
 },
 text: {
    color: '#3f2949',
    marginTop: 10
 }
});

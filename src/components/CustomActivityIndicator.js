import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

export default function CustomActivityIndicator() {
  return (
    <ActivityIndicator style={styles.activityStyle} color="black" size={80} />
  );
}

const styles = StyleSheet.create({
  activityStyle: {
    color: 'black',
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
});

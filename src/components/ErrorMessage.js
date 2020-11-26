import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorMessage({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    fontSize: 16,
  },
  container: {
    justifyContent: 'center',
  },
});

import React from 'react';
import { Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
const Link = ({ url, children }) => {
  const onPress = () => {
    Linking.openURL(url);
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
});

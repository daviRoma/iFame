import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import em from 'emoji-dictionary';

const Tag = ({ children, emoji }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.tag}>
        {children} {emoji ? em.getUnicode(emoji) : null}
      </Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 3,
    padding: 5,
    backgroundColor: '#d3d3d3',
  },
  tag: {
    fontWeight: 'bold',
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import em from 'emoji-dictionary';

const Tag = ({ children, emoji, selected }) => {
  return (
    <View
      style={[
        styles.container,
        selected ? styles.selectedBackground : styles.noSelectedBackground,
      ]}>
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
    padding: 8,
    shadowOpacity: 5,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  tag: {
    fontSize: 16,
    fontWeight: '200',
  },
  noSelectedBackground: {
    backgroundColor: '#d5d7db',
  },
  selectedBackground: {
    backgroundColor: '#bad1ff',
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

export default function ({ item, onPress }) {
  return (
    <ListItem key={item.title} bottomDivider onPress={onPress}>
      {item.type === 'breakfast' ? (
        <Icon name="coffee" type="font-awesome" color="#4d3319" />
      ) : (
        <Icon name="cutlery" type="font-awesome" color="#006600" />
      )}

      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        <ListItem.Subtitle>{item.type}</ListItem.Subtitle>
        <ListItem.Subtitle>{`${item.location.name}, ${item.day} at ${item.hour}`}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 3,
  },
  textContainer: {},
  text: {
    fontSize: 17,
  },
  actionContainer: {
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    height: 25,
    justifyContent: 'center',
    paddingHorizontal: 12.5,
  },
});

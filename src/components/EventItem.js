import React from 'react';
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
        <ListItem.Subtitle>{item.category}</ListItem.Subtitle>
        <ListItem.Subtitle>{`${item.location.name_it}, ${item.day} at ${item.hour}`}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}

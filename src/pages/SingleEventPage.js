import React from 'react';
import { View, Text } from 'react-native';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectEventById,
  selectAllEvents,
} from '../features/events/eventSlice';

export default function SingleEventPage({ route, navigation }) {
  const { id } = route.params;

  const event = useSelector(selectAllEvents).find((id) => id == id);

  return (
    <View style={[styles.pageContainer, { paddingBottom: 10 }]}>
      <Card containerStyle={{ margin: 0 }}>
        <Card.Title>{event.title}</Card.Title>
        <Card.Divider />
        <Text>{event.type}</Text>
        <Text>
          {event.day}, {event.hour}
        </Text>
        <Text>{event.location}</Text>
        <Text>{event.participants}</Text>
        <View style={styles.participantsContainer}>
          {event.currentPartecipants.map((p, i) => (
            <ListItem key={i} bottomDivider>
              {/* <Avatar source={{ uri: p.avatar_url }} /> */}
              <ListItem.Content>
                <ListItem.Title>{p.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </Card>
    </View>
  );
}

const styles = {
  pageContainer: {
    flex: 1,
  },
  participantsContainer: {
    paddingTop: 10,
  },
};

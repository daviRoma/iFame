import React, { useEffect, useState } from 'react';
import { Card, ListItem } from 'react-native-elements';
import { Text, View, StyleSheet } from 'react-native';
import { useEventPartecipants } from '../hooks';

const EventDetail = ({ event }) => {
  const [partecipants, loading] = useEventPartecipants(
    event.currentPartecipants,
  );
  console.log(partecipants);
  console.log(loading);
  return (
    <Card containerStyle={{ margin: 0 }}>
      <Card.Title>{event.title}</Card.Title>
      <Card.Divider />
      <Text>
        {event.day}, {event.hour}
      </Text>
      <Text>{event.location}</Text>
      <Text>{event.participants}</Text>
      {/* {event.currentPartecipants ? (
        <View style={styles.participantsContainer}>
          {event.currentPartecipants.map((p, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{p.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      ) : null} */}
    </Card>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  participantsContainer: {
    paddingTop: 10,
  },
});

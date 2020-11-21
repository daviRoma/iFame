import React from 'react';
import { Card, ListItem } from 'react-native-elements';
import { Text, View, StyleSheet } from 'react-native';

const EventDetail = ({ event }) => {
  return (
    <Card containerStyle={{ margin: 0 }}>
      <Card.Title>{event.title}</Card.Title>
      <Card.Divider />
      <Text>
        {event.day}, {event.hour}
      </Text>
      <Text>{event.location}</Text>
      <Text>{event.participants}</Text>
      {event.currentPartecipants ? (
        <View style={styles.participantsContainer}>
          {event.currentPartecipants.map((p, i) => (
            // <ListItem key={i} bottomDivider>
            //   {/* <Avatar source={{ uri: p.avatar_url }} /> */}
            //   <ListItem.Content>
            //     <ListItem.Title>{p.name}</ListItem.Title>
            //   </ListItem.Content>
            // </ListItem>
            <Text>{p}</Text>
          ))}
        </View>
      ) : null}
    </Card>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  participantsContainer: {
    paddingTop: 10,
  },
});

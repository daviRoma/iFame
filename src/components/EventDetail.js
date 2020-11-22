import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { CustomActivityIndicator } from '../components';
import { useEventPartecipants } from '../hooks';

const EventDetail = ({ event }) => {
  const [partecipants, loading] = useEventPartecipants(event);
  const restaurant = event.restaurant;

  if (loading) {
    return <CustomActivityIndicator />;
  }
  return (
    <Card containerStyle={{ margin: 0 }}>
      <Card.Image source={{ uri: restaurant.image_url }} />
      <Card.Divider />
      <Card.Title h3>{event.title}</Card.Title>
      <Text>
        {event.day}, {event.hour}
      </Text>
      <Text>{event.location.name_it}</Text>
      <Text>{event.partecipants}</Text>
      {partecipants && partecipants.length > 0 ? (
        <View style={styles.participantsContainer}>
          {partecipants.map((p, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{p.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      ) : null}
    </Card>
    // </View>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  participantsContainer: {
    paddingTop: 10,
  },
  container: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  photoContainer: {
    flex: 2,
    // borderColor: 'green',
    // borderWidth: 1,
  },
  infoContainer: {
    flex: 4,
    // borderColor: 'blue',
    // borderWidth: 1,
  },
});

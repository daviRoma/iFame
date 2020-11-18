import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_COLOR } from '../common/theme';
import { ErrorMessage } from '../components';
import { deleteEvent } from '../features/myEvents/myEventsSlice';

export default function SingleEventPage({ route, navigation }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const { myEvents, loading, error } = useSelector((state) => state.myEvents);
  const event = myEvents.find((item) => item.id === id);
  console.log(event);
  return (
    <>
      {event ? (
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
            {event.currentPartecipants ? (
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
            ) : null}
            <Button
              title="Elimina evento"
              onPress={() => {
                dispatch(deleteEvent(id, navigation));
              }}
              buttonStyle={styles.deleteButton}
              loading={loading}
            />
          </Card>
        </View>
      ) : (
        <>{error ? <ErrorMessage>{error}</ErrorMessage> : null}</>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  participantsContainer: {
    paddingTop: 10,
  },
  deleteButton: {
    backgroundColor: DELETE_COLOR,
  },
});

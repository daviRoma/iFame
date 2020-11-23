import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_COLOR } from '../common/theme';
import { ErrorMessage } from '../components';
import { deleteEvent } from '../features/myEvents/myEventsSlice';
import EventDetail from '../features/events/EventDetail';

export default function MyEventSinglePage({ route, navigation }) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const { myEvents, loading, error } = useSelector((state) => state.myEvents);
  const event = myEvents.find((item) => item.id === id);
  return (
    <>
      {event ? (
        <View style={[styles.pageContainer, { paddingBottom: 10 }]}>
          <EventDetail event={event} />
          <Button
            title="Elimina evento"
            onPress={() => {
              dispatch(deleteEvent(id, navigation));
            }}
            buttonStyle={styles.deleteButton}
            loading={loading}
          />
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
  deleteButton: {
    backgroundColor: DELETE_COLOR,
  },
});

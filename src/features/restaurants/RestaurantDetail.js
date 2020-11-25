import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import {
  CustomActivityIndicator,
  ErrorMessage,
  RestaurantDetailComponent,
  Spacer,
} from '../../components';
import { useRestaurantDetail } from '../../hooks';
import {
  addInformations,
  createEvent as createEventAction,
} from '../eventCreation/eventCreationSlice';

const RestaurantDetail = ({ navigation, route }) => {
  const { restaurant, error } = useRestaurantDetail(route.params.id);
  const dispatch = useDispatch();

  const createEvent = () => {
    dispatch(addInformations({ restaurant: restaurant }));
    dispatch(createEventAction(navigation));
  };

  return (
    <ScrollView style={styles.container}>
      {!restaurant ? (
        <CustomActivityIndicator />
      ) : (
        <>
          {error ? (
            <ErrorMessage>{error.message}</ErrorMessage>
          ) : (
            <View>
              <RestaurantDetailComponent restaurant={restaurant} />
              <Spacer />
              <Button title="Crea evento" onPress={createEvent} />
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

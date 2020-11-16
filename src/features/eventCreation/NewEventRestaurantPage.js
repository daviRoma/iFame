import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NewEventRestaurantPage = () => {
  const {
    titleState,
    dateState,
    locationState,
    categoryState,
    numPartState,
    descriptionState,
  } = useSelector(selectState);
  return (
    <View>
      <Text>NewEventRestaurantPage</Text>
    </View>
  );
};

export default NewEventRestaurantPage;

const styles = StyleSheet.create({});

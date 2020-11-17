import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RestaurantDetail = ({ navigation, route }) => {
  return (
    <View>
      <Text>{route.params.id}</Text>
    </View>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({});

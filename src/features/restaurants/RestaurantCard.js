import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';

const RestaurantCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text>
        {item.rating} Stars, {item.review_count} Reviews
      </Text>
    </View>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  image: {
    width: 250,
    height: 100,
    borderRadius: 2,
  },
  title: {
    fontWeight: 'bold',
  },
});

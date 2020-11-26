import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-elements';

const RestaurantCard = ({ item }) => {
  return (
    <Card>
      <Card.Title style={styles.title}>{item.name}</Card.Title>
      {item.image_url ? (
        <Card.Image source={{ uri: item.image_url }} />
      ) : (
        <Card.Image
          source={require('../../assets/restaurant-placeholder.jpg')}
        />
      )}
      <Card.Divider />
      <Text>Fascia di prezzo: {item.price}</Text>
      <Text>Rating: {item.rating} Stelle</Text>
      <Text>Numero recensioni: {item.review_count}</Text>
    </Card>
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
    fontSize: 20,
  },
});

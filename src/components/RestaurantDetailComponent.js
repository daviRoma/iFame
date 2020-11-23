import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import Link from './Link';

const RestaurantDetailComponent = ({ restaurant }) => {
  return (
    <View style={styles.container}>
      <Text h3>{restaurant.name}</Text>
      <FlatList
        data={restaurant.photos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image style={styles.list} source={{ uri: item }} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.phoneContainer}>
        <Text>
          {restaurant.location.display_address.map((address, index) => (
            <Text key={index}>{address} </Text>
          ))}
        </Text>
      </View>
      <View style={styles.phoneContainer}>
        <Text>Telefono: </Text>
        <Link url={`tel:${restaurant.phone}`}>{restaurant.display_phone}</Link>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            ...restaurant.coordinates,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker coordinate={restaurant.coordinates} />
        </MapView>
      </View>
    </View>
  );
};

export default RestaurantDetailComponent;

const styles = StyleSheet.create({
  list: {
    height: 150,
    width: 250,
    margin: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    flexDirection: 'row',
    margin: 15,
  },
  phoneContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  map: { height: 200, width: 400 },
});

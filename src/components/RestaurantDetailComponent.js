import React from 'react';
import { FlatList, StyleSheet, View, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ImageWithOverlay from './ImageWithOverlay';
import Link from './Link';

const RestaurantDetailComponent = ({ restaurant }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text h3>{restaurant.name}</Text>
      <FlatList
        data={restaurant.photos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <ImageWithOverlay image_url={item} />}
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
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            ...restaurant.coordinates,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker coordinate={restaurant.coordinates} title={restaurant.name} />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default RestaurantDetailComponent;

const styles = StyleSheet.create({
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

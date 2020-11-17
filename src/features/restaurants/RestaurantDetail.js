import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { useRestaurantDetail } from '../../hooks';
import { CustomActivityIndicator, ErrorMessage } from '../../components';
import MapView from 'react-native-maps';

const RestaurantDetail = ({ navigation, route }) => {
  const { restaurant, error } = useRestaurantDetail(route.params.id);
  return (
    <View>
      {!restaurant ? (
        <CustomActivityIndicator />
      ) : (
        <>
          {error ? (
            <ErrorMessage>{error.message}</ErrorMessage>
          ) : (
            <View>
              <Text h2>{restaurant.name}</Text>
              <FlatList
                data={restaurant.photos}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Image style={styles.list} source={{ uri: item }} />
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
              <Text>Telefono: {restaurant.display_phone}</Text>
              <MapView provider="google" />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({
  list: {
    height: 150,
    width: 250,
    margin: 10,
  },
});

import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { CustomActivityIndicator } from '.';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function GoogleMapsView({ region, events }) {
  return (
    <View style={styles.mapContainer}>
      {region ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapViewComponent}
          region={region}
          zoomEnabled
          zoomControlEnabled
          showsScale={true}
          //onRegionChangeComplete={(reg) => setRegion(reg)}
        >
          {events.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.restaurant.coordinates}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      ) : (
        <CustomActivityIndicator />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  mapViewComponent: {
    width: windowWidth - 50,
    height: windowHeight / 2 - 80,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

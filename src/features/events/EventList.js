import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
} from 'react-native';

import { CustomActivityIndicator } from '../../components';
import EventItem from './EventItem';

import * as Routes from '../../routes';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EventList({ loading, events, navigation }) {
  return (
    <View style={styles.listContainer}>
      {loading || events === null ? (
        <SafeAreaView style={[styles.activityContainer, styles.horizontal]}>
          <CustomActivityIndicator />
        </SafeAreaView>
      ) : (
        <FlatList
          data={events}
          renderItem={({ item }) => {
            return (
              <EventItem
                item={item}
                onPress={() => {
                  navigation.navigate(Routes.SINGLE_EVENT, {
                    id: item.id,
                  });
                }}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: windowHeight / 2 - 160,
    marginTop: 0,
  },
});

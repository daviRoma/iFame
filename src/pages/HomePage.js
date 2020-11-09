import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Routes from '../routes';

export default function HomePage({ navigation }) {
  return (
    <View>
      <Text>HomePage</Text>
      <Button
        title="Go to new event"
        onPress={() => {
          navigation.navigate(Routes.NEW_EVENT);
        }}
      />
      <Button
        title="Go to single event"
        onPress={() => {
          navigation.navigate(Routes.SINGLE_EVENT);
        }}
      />
    </View>
  );
}

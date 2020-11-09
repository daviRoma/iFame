import React from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Routes from '../routes';

export default function HomePage({ navigation }) {
  return (
    <SafeAreaView>
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
      <Button
        title="Go to update event"
        onPress={() => {
          navigation.navigate(Routes.UPDATE_EVENT);
        }}
      />
    </SafeAreaView>
  );
}

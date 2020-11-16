import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Routes from '../../routes';

export default function NewEventFirstPage({ navigation }) {
  return (
    <View>
      <Text>NewEventPage</Text>
      <Button
        title="Go to second part"
        onPress={() => {
          navigation.navigate(Routes.NEW_EVENT_SECOND);
        }}
      />
    </View>
  );
}

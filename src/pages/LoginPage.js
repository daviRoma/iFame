import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Routes from '../routes';

export default function LoginPage({ navigation }) {
  return (
    <View>
      <Text>LoginPage</Text>
      <Button
        title="Go to sign in"
        onPress={() => {
          navigation.navigate(Routes.SIGNIN);
        }}
      />
      <Button
        title="Go to home"
        onPress={() => {
          navigation.navigate(Routes.TAB_PAGES);
        }}
      />
    </View>
  );
}
